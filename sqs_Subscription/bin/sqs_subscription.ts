#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SqsSubscriptionStack } from '../lib/sqs_subscription-stack';

const app = new cdk.App();
new SqsSubscriptionStack(app, 'SqsSubscriptionStack');
