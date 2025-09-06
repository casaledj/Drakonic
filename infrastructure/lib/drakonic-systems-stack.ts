import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as path from 'path';

export class DrakonicSystemsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket for hosting static website
    const websiteBucket = new s3.Bucket(this, 'DrakonicSystemsBucket', {
      bucketName: `drakonic-systems-${cdk.Aws.ACCOUNT_ID}-${cdk.Aws.REGION}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      versioned: false,
    });

    // Origin Access Identity for CloudFront
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OAI', {
      comment: `OAI for Drakonic Systems website`
    });

    // Grant CloudFront access to the S3 bucket
    websiteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [websiteBucket.arnForObjects('*')],
        principals: [originAccessIdentity.grantPrincipal],
      })
    );

    // Security Headers Response Function
    const securityHeadersFunction = new cloudfront.Function(this, 'SecurityHeaders', {
      code: cloudfront.FunctionCode.fromInline(`
        function handler(event) {
          var response = event.response;
          var headers = response.headers;
          
          headers['strict-transport-security'] = { value: 'max-age=63072000; includeSubdomains; preload' };
          headers['content-type-options'] = { value: 'nosniff' };
          headers['x-frame-options'] = { value: 'DENY' };
          headers['x-content-type-options'] = { value: 'nosniff' };
          headers['referrer-policy'] = { value: 'strict-origin-when-cross-origin' };
          headers['permissions-policy'] = { value: 'camera=(), microphone=(), geolocation=()' };
          
          return response;
        }
      `),
      comment: 'Add security headers to responses'
    });

    // CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, 'DrakonicSystemsDistribution', {
      defaultRootObject: 'index.html',
      domainNames: [], // Add custom domain here if needed
      certificate: undefined, // Add SSL certificate if using custom domain
      
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket, {
          originAccessIdentity: originAccessIdentity
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        compress: true,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        
        functionAssociations: [
          {
            function: securityHeadersFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_RESPONSE,
          }
        ],
      },

      // Custom error responses for SPA routing
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],

      // Additional cache behaviors for static assets
      additionalBehaviors: {
        '/assets/*': {
          origin: new origins.S3Origin(websiteBucket, {
            originAccessIdentity: originAccessIdentity
          }),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          compress: true,
        }
      },

      priceClass: cloudfront.PriceClass.PRICE_CLASS_100, // Use only North America and Europe edge locations for cost optimization
    });

    // Deploy the website to S3
    const deployment = new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(path.join(__dirname, '../../frontend/dist'))],
      destinationBucket: websiteBucket,
      distribution: distribution,
      distributionPaths: ['/*'],
      prune: true,
      retainOnDelete: false,
    });

    // Stack Outputs
    new cdk.CfnOutput(this, 'BucketName', {
      value: websiteBucket.bucketName,
      description: 'S3 Bucket name for the website'
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront Distribution ID'
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'CloudFront Distribution Domain Name'
    });

    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'Website URL'
    });

    // Optional: Add custom domain output if domain names are configured
    // Note: This will be added when custom domains are configured
    // if (distribution.domainNames && distribution.domainNames.length > 0) {
    //   new cdk.CfnOutput(this, 'CustomDomainURL', {
    //     value: `https://${distribution.domainNames[0]}`,
    //     description: 'Custom Domain Website URL'
    //   });
    // }
  }
}