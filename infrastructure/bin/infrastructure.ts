#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DrakonicSystemsStack } from '../lib/drakonic-systems-stack';

const app = new cdk.App();

new DrakonicSystemsStack(app, 'DrakonicSystemsStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  description: 'Drakonic Systems - Static Landing Page Infrastructure'
});