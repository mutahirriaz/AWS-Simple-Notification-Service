import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as PublishUsingEvent from '../lib/publish_using_event-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new PublishUsingEvent.PublishUsingEventStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
