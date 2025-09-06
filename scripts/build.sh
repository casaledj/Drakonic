#!/bin/bash

set -e

echo "🏗️  Building Drakonic Systems Landing Page..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Installing dependencies...${NC}"

# Install root dependencies
npm install

# Install frontend dependencies
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install

# Build frontend
echo -e "${BLUE}🔨 Building frontend...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Frontend build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend build complete${NC}"

# Go back to root and build infrastructure
cd ../infrastructure

echo -e "${BLUE}📦 Installing infrastructure dependencies...${NC}"
npm install

echo -e "${BLUE}🔨 Building infrastructure...${NC}"
npm run build

echo -e "${GREEN}✅ Infrastructure build complete${NC}"

echo -e "${GREEN}🎉 Build process completed successfully!${NC}"
echo -e "${YELLOW}💡 Ready to deploy with: npm run deploy${NC}"