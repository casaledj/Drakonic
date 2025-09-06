#!/bin/bash

set -e

echo "🚀 Deploying Drakonic Systems Landing Page..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if AWS CLI is configured
export PATH="$HOME/.local/bin:$PATH"
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo -e "${RED}❌ AWS CLI not configured or no valid credentials${NC}"
    echo -e "${YELLOW}💡 Please run 'aws configure' or set up your AWS credentials${NC}"
    exit 1
fi

# Run the build script first
echo -e "${BLUE}🔨 Running build process...${NC}"
./scripts/build.sh

# Check if frontend dist directory exists
if [ ! -d "frontend/dist" ]; then
    echo -e "${RED}❌ Frontend build not found. Please run build first.${NC}"
    exit 1
fi

# Deploy with CDK
echo -e "${BLUE}☁️  Deploying infrastructure to AWS...${NC}"
cd infrastructure

# Bootstrap CDK if needed (this is safe to run multiple times)
echo -e "${BLUE}🏗️  Checking CDK bootstrap...${NC}"
npx cdk bootstrap

# Deploy the stack
echo -e "${BLUE}🚀 Deploying CDK stack...${NC}"
npx cdk deploy --require-approval never

echo -e "${GREEN}✅ Deployment successful!${NC}"

# Get the website URL
echo -e "${BLUE}🔍 Getting website URL...${NC}"
WEBSITE_URL=$(npx cdk output DrakonicSystemsStack.WebsiteURL --no-color 2>/dev/null || echo "")

if [ ! -z "$WEBSITE_URL" ]; then
    echo -e "${GREEN}🌐 Website URL: ${WEBSITE_URL}${NC}"
    echo -e "${YELLOW}💡 Your Drakonic Systems landing page is now live!${NC}"
else
    echo -e "${YELLOW}⚠️  Could not retrieve website URL. Check AWS Console for CloudFront distribution.${NC}"
fi

echo -e "${GREEN}🎉 Deployment completed!${NC}"