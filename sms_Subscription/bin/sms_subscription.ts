#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SmsSubscriptionStack } from '../lib/sms_subscription-stack';

const app = new cdk.App();
new SmsSubscriptionStack(app, 'SmsSubscriptionStack');
