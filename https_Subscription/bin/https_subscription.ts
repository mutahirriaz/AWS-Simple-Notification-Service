#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HttpsSubscriptionStack } from '../lib/https_subscription-stack';

const app = new cdk.App();
new HttpsSubscriptionStack(app, 'HttpsSubscriptionStack');
