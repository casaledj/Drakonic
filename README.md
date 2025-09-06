# Drakonic Systems Landing Page

A modern, responsive landing page for Drakonic Systems built with React + Vite and deployed on AWS using CDK.

## 🏗️ Project Structure

```
drakonic-systems-landing/
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── public/            # Static assets
│   └── package.json
├── infrastructure/        # AWS CDK infrastructure code
│   ├── lib/
│   │   └── drakonic-systems-stack.ts
│   ├── bin/
│   │   └── infrastructure.ts
│   └── package.json
├── scripts/               # Build and deployment scripts
├── .github/workflows/     # GitHub Actions CI/CD
└── README.md
```

## 🚀 Features

### Frontend (React + Vite)
- **Modern Design**: Clean, professional landing page with Tailwind CSS
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: Built with Vite for optimal development and build performance
- **Interactive**: Smooth animations and modern UI components
- **SEO Optimized**: Proper meta tags and semantic HTML

### Infrastructure (AWS CDK)
- **S3 Bucket**: Secure hosting with private access (CloudFront only)
- **CloudFront**: Global CDN with HTTPS, compression, and security headers
- **Security**: HSTS, content type options, frame options, and CSP headers
- **Caching**: Optimized cache policies for static assets
- **Cost Optimized**: Price class 100 (North America and Europe only)

### CI/CD Pipeline
- **GitHub Actions**: Automated testing and deployment
- **Multi-stage**: Test, build, and deploy stages
- **AWS Integration**: Secure deployment using OIDC
- **Cache Invalidation**: Automatic CloudFront cache clearing

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **AWS CLI** configured with appropriate credentials
- **AWS CDK** CLI: `npm install -g aws-cdk`
- **Git** for version control

### AWS Setup

1. **Configure AWS CLI:**
   ```bash
   aws configure
   ```

2. **Set up AWS credentials** with the following permissions:
   - CloudFormation (full access)
   - S3 (full access)
   - CloudFront (full access)
   - IAM (limited access for roles/policies)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Local Development
```bash
npm run dev
```
This starts the frontend development server at `http://localhost:3000`

### 3. Build Project
```bash
npm run build
```
This builds both frontend and infrastructure components

### 4. Bootstrap CDK (First time only)
```bash
npm run bootstrap
```

### 5. Deploy to AWS
```bash
npm run deploy
```

The deployment script will:
- Build the frontend application
- Compile the CDK infrastructure
- Deploy to AWS
- Output the website URL

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build frontend and infrastructure |
| `npm run deploy` | Deploy to AWS |
| `npm run destroy` | Remove AWS resources |
| `npm run synth` | Generate CloudFormation templates |
| `npm run bootstrap` | Bootstrap CDK (first time only) |
| `npm run clean` | Clean all build artifacts and dependencies |
| `npm run install:all` | Install all project dependencies |

## 🏗️ Deployment Process

The deployment follows these steps:

1. **Frontend Build**: React app is built using Vite
2. **Infrastructure Build**: CDK code is compiled to JavaScript
3. **CDK Bootstrap**: Ensures CDK toolkit is available (if needed)
4. **Stack Deployment**: Creates/updates AWS resources:
   - S3 bucket for hosting
   - CloudFront distribution for global delivery
   - Origin Access Identity for security
   - Security headers function
5. **Content Upload**: Frontend files uploaded to S3
6. **Cache Invalidation**: CloudFront cache cleared for immediate updates

## ☁️ AWS Architecture

### Components

- **S3 Bucket**: 
  - Stores static website files
  - Private access (no public bucket policy)
  - Server-side encryption enabled
  - Versioning disabled for cost optimization

- **CloudFront Distribution**:
  - Global content delivery network
  - HTTPS redirect enforced
  - Custom error pages for SPA routing
  - Security headers via CloudFront Functions
  - Optimized caching policies

- **Security Features**:
  - Origin Access Identity (OAI) for S3 access
  - Security headers (HSTS, CSP, X-Frame-Options)
  - HTTPS-only access
  - Restricted price class for cost control

### Outputs
After deployment, the stack provides:
- Bucket name
- CloudFront distribution ID
- Website URL (CloudFront domain)
- Custom domain URL (if configured)

## 🔧 CI/CD Setup

### GitHub Actions

The project includes a complete CI/CD pipeline:

1. **Test Job**: Runs on all pushes and PRs
   - Install dependencies
   - Build frontend and infrastructure
   - Run tests (when available)

2. **Deploy Job**: Runs only on main branch pushes
   - Configure AWS credentials
   - Build and deploy to AWS
   - Comment deployment URL on PRs

### Required Secrets

Configure these in your GitHub repository settings:

```
AWS_ROLE_TO_ASSUME=arn:aws:iam::ACCOUNT:role/GitHubActionsRole
AWS_REGION=us-east-1
```

## 🎨 Customization

### Adding Custom Domain

1. **Update CDK stack** in `infrastructure/lib/drakonic-systems-stack.ts`:
   ```typescript
   const distribution = new cloudfront.Distribution(this, 'Distribution', {
     domainNames: ['www.drakonic-systems.com'],
     certificate: cert, // Add your SSL certificate
     // ... other config
   });
   ```

2. **Create SSL certificate** in AWS Certificate Manager
3. **Update DNS** to point to CloudFront distribution

### Modifying Content

- Edit React components in `frontend/src/components/`
- Update styling in `frontend/src/index.css`
- Modify content in individual component files

### Environment Variables

For different environments, update:
- Stack names in CDK
- Domain names
- AWS regions

## 📊 Cost Optimization

The infrastructure is designed for cost efficiency:

- **S3**: Pay only for storage used
- **CloudFront**: Price class 100 (reduced edge locations)
- **No compute resources**: Fully static hosting
- **Caching**: Reduces origin requests

Estimated monthly cost for typical traffic: **$1-5**

## 🔍 Monitoring and Maintenance

### CloudWatch Integration
- CloudFront metrics automatically available
- S3 access logs can be enabled
- Custom dashboards can be created

### Updates
- Frontend: Push changes to trigger automatic deployment
- Infrastructure: Modify CDK code and redeploy
- Dependencies: Regular updates recommended

## 🆘 Troubleshooting

### Common Issues

1. **CDK Bootstrap Error**:
   ```bash
   npx cdk bootstrap --trust=ACCOUNT-ID --cloudformation-execution-policies=arn:aws:iam::aws:policy/AdministratorAccess
   ```

2. **Build Failures**:
   - Check Node.js version (18+ required)
   - Clear dependencies: `npm run clean && npm run install:all`

3. **Deployment Errors**:
   - Verify AWS credentials: `aws sts get-caller-identity`
   - Check CloudFormation events in AWS Console

4. **CloudFront Caching Issues**:
   - Manual invalidation: `aws cloudfront create-invalidation --distribution-id ID --paths "/*"`

### Support

For issues and questions:
- Check AWS CloudFormation events
- Review CloudWatch logs
- Contact: info@drakonic-systems.com

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Drakonic Systems** - Pioneering the Future of Software with Generative AI