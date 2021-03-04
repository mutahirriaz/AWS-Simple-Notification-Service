import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';

export class SmsSubscriptionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // create an SNS topic
    const myTopic = new sns.Topic(this, "MyTopic");

    // create a dedLetter Queue
    const dlQueue = new sqs.Queue(this, "DeadLetter Queu", {
      queueName: "MySubscription_DLQ",
      retentionPeriod: cdk.Duration.days(14),
    });

    // subscribe SMS number to the topic
    myTopic.addSubscription(
      new subscriptions.SmsSubscription("+923102596286", {
        deadLetterQueue: dlQueue,
        filterPolicy: {
          test: sns.SubscriptionFilter.numericFilter({
            greaterThan: 100
          }),
        },
      })
    );

  }
}
