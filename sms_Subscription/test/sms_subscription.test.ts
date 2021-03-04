import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SmsSubscription from '../lib/sms_subscription-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SmsSubscription.SmsSubscriptionStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
