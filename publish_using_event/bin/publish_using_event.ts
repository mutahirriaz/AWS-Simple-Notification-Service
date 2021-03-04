#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PublishUsingEventStack } from '../lib/publish_using_event-stack';

const app = new cdk.App();
new PublishUsingEventStack(app, 'PublishUsingEventStack');
