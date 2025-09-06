# Deployment Guide - Drakonic Systems Landing Page

This guide provides step-by-step instructions for deploying the Drakonic Systems landing page to AWS.

## 🚀 Quick Deployment

For a quick deployment, run these commands in order:

```bash
# 1. Install all dependencies
npm run install:all

# 2. Bootstrap CDK (first time only)
npm run bootstrap

# 3. Deploy to AWS
npm run deploy
```

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] AWS CLI installed (`aws --version`)
- [ ] AWS CLI configured (`aws sts get-caller-identity`)
- [ ] CDK CLI installed globally (`cdk --version`)

## 🔧 Detailed Setup

### 1. AWS CLI Configuration

If you haven't configured AWS CLI yet:

```bash
# Configure AWS CLI with your credentials
aws configure
```

You'll need:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., us-east-1)
- Default output format (json)

**Required Permissions:**
Your AWS user/role needs these permissions:
- CloudFormation: Full access
- S3: Full access
- CloudFront: Full access
- IAM: Limited access (create/manage roles and policies)

### 2. Install CDK CLI

```bash
npm install -g aws-cdk
```

Verify installation:
```bash
cdk --version
```

### 3. Project Setup

```bash
# Clone or navigate to project directory
cd drakonic-systems-landing

# Install all dependencies
npm run install:all
```

### 4. CDK Bootstrap

This step creates the necessary AWS resources for CDK deployments:

```bash
npm run bootstrap
```

**Note:** This only needs to be done once per AWS account/region combination.

### 5. Build and Deploy

```bash
# Build everything
npm run build

# Deploy to AWS
npm run deploy
```

## 🏗️ What Gets Created

The deployment creates these AWS resources:

### S3 Resources
- **S3 Bucket**: Stores your website files
  - Name: `drakonic-systems-{account-id}-{region}`
  - Private access (no public bucket policy)
  - Server-side encryption enabled

### CloudFront Resources
- **CloudFront Distribution**: Global CDN
  - HTTPS redirect enforced
  - Custom error pages for SPA routing
  - Security headers via CloudFront Functions
  - Price class 100 (North America + Europe)

- **Origin Access Identity**: Secure S3 access
  - Only CloudFront can access S3 bucket

### IAM Resources
- **Execution Role**: For CDK deployments
- **Policies**: Minimal required permissions

## 📊 Cost Estimate

Expected monthly costs (USD) for typical usage:

| Service | Est. Monthly Cost |
|---------|-------------------|
| S3 Storage (1GB) | $0.02 |
| CloudFront (100GB transfer) | $8.50 |
| CloudFront Requests (1M) | $0.75 |
| **Total** | **~$9-10** |

*Costs may vary based on usage patterns and AWS region.*

## 🔍 Verification Steps

After deployment, verify everything works:

### 1. Check Stack Status
```bash
# View CDK outputs
cd infrastructure
npx cdk output
```

### 2. Test Website
1. Copy the website URL from CDK outputs
2. Open in browser
3. Verify all sections load correctly
4. Test mobile responsiveness

### 3. Check AWS Console
1. **CloudFormation**: Verify stack shows "CREATE_COMPLETE"
2. **S3**: Check bucket contains website files
3. **CloudFront**: Verify distribution is "Deployed"

## 🔄 Updates and Maintenance

### Deploying Changes

After making changes to the website:

```bash
# Rebuild and redeploy
npm run deploy
```

CloudFront cache is automatically invalidated.

### Manual Cache Invalidation

If needed, manually clear CloudFront cache:

```bash
# Get distribution ID from CDK outputs
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Viewing Logs

Check CloudFormation events for deployment issues:
```bash
aws cloudformation describe-stack-events \
  --stack-name DrakonicSystemsStack
```

## 🆘 Troubleshooting

### Common Issues and Solutions

#### 1. CDK Bootstrap Fails
**Error**: `Unable to bootstrap account: Account not found`

**Solution**:
```bash
# Check AWS credentials
aws sts get-caller-identity

# Try with specific parameters
npx cdk bootstrap \
  --trust=YOUR_ACCOUNT_ID \
  --cloudformation-execution-policies=arn:aws:iam::aws:policy/AdministratorAccess
```

#### 2. Build Fails
**Error**: `npm ERR! Missing script: "build"`

**Solution**:
```bash
# Clean and reinstall
npm run clean
npm run install:all
```

#### 3. Deployment Hangs
**Error**: Deployment stuck in progress

**Solution**:
1. Check CloudFormation console for detailed errors
2. Common causes:
   - S3 bucket name conflicts
   - Insufficient permissions
   - Resource limits exceeded

#### 4. Website Shows 403 Error
**Error**: AccessDenied when accessing website

**Solution**:
1. Check CloudFront distribution status (wait for deployment)
2. Verify S3 bucket policy allows CloudFront access
3. Check if index.html exists in S3

#### 5. Changes Not Visible
**Issue**: Website updates not showing

**Solution**:
```bash
# Force cache invalidation
aws cloudfront create-invalidation \
  --distribution-id $(npx cdk output DrakonicSystemsStack.DistributionId --no-color) \
  --paths "/*"
```

### Getting Help

If you encounter issues:

1. **Check logs**: CloudFormation events in AWS Console
2. **Verify credentials**: `aws sts get-caller-identity`
3. **Clean rebuild**: `npm run clean && npm run install:all`
4. **Stack trace**: Check detailed error messages

### Support Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [CloudFormation User Guide](https://docs.aws.amazon.com/cloudformation/)
- [React + Vite Documentation](https://vitejs.dev/guide/)

## 🎯 Advanced Configuration

### Custom Domain Setup

1. **Purchase domain** in Route 53 or external registrar

2. **Create SSL certificate** in AWS Certificate Manager:
   ```bash
   aws acm request-certificate \
     --domain-name example.com \
     --domain-name "*.example.com" \
     --validation-method DNS
   ```

3. **Update CDK stack** in `infrastructure/lib/drakonic-systems-stack.ts`:
   ```typescript
   const distribution = new cloudfront.Distribution(this, 'Distribution', {
     domainNames: ['example.com', 'www.example.com'],
     certificate: certificate,
     // ... rest of config
   });
   ```

4. **Redeploy**:
   ```bash
   npm run deploy
   ```

5. **Update DNS** records to point to CloudFront distribution

### Environment-Specific Deployments

Create different stacks for dev/staging/prod:

```typescript
// In bin/infrastructure.ts
const envName = app.node.tryGetContext('env') || 'dev';

new DrakonicSystemsStack(app, `DrakonicSystemsStack-${envName}`, {
  // ... config
});
```

Deploy to specific environment:
```bash
cdk deploy --context env=prod
```

### Monitoring Setup

Add CloudWatch dashboards and alarms:

```typescript
// Add to CDK stack
const dashboard = new cloudwatch.Dashboard(this, 'Dashboard', {
  dashboardName: 'DrakonicSystems'
});

const errorRateAlarm = new cloudwatch.Alarm(this, 'ErrorRateAlarm', {
  metric: distribution.metricErrorRate(),
  threshold: 5,
  evaluationPeriods: 2,
});
```

---

**Ready to deploy?** Run `npm run deploy` and your Drakonic Systems landing page will be live on AWS!