#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaSubscriptionStack } from '../lib/lambda_subscription-stack';

const app = new cdk.App();
new LambdaSubscriptionStack(app, 'LambdaSubscriptionStack');
