#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EmailSubscriptionStack } from '../lib/email_subscription-stack';

const app = new cdk.App();
new EmailSubscriptionStack(app, 'EmailSubscriptionStack');
