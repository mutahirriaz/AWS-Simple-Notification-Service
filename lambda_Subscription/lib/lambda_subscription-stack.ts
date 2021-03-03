import * as cdk from '@aws-cdk/core';
import * as sns from "@aws-cdk/aws-sns";
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import * as lambda from "@aws-cdk/aws-lambda";
import * as sqs from "@aws-cdk/aws-sqs";

export class LambdaSubscriptionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const lambdaFn = new lambda.Function(this, "LambdaHandler", {
      code: lambda.Code.fromAsset('lambda'),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler'
    });

    // adding a dead letter queue
    const dlQueue = new sqs.Queue(this, "DeadLetterQueue", {
      queueName: "MySubscription_DLQ",
      retentionPeriod: cdk.Duration.days(14),
    });

    // create an SNS topic
    const myTopic = new sns.Topic(this, "MyTopic");

    // subscribe lambda function to the topic

    // we have also assinged a filter policy here. The SNS will only invoke the lambda function if the message published on 
    // the topic satisfies the condition in the filter.

    // We have also assigned a dead letter queue to store the failed events

    myTopic.addSubscription(
      new subscriptions.LambdaSubscription(lambdaFn, {
        filterPolicy: {
          test: sns.SubscriptionFilter.numericFilter({
            between: {start: 100, stop: 200},
          })
        },
        deadLetterQueue: dlQueue
      })
    );


  }
}
