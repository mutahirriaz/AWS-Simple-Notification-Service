import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';

export class EmailSubscriptionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

     // create SNS Topic
     const myTopic = new sns.Topic(this, "myTopic");

 
     // create a dedLetter Queue
     const dlQueue = new sqs.Queue(this, "DeadLetter Queu", {
       queueName: "MySubscription_DLQ",
       retentionPeriod: cdk.Duration.days(14),
     });

     myTopic.addSubscription(
       new subscriptions.EmailSubscription("mutahirriaz2@gmail.com", {
         json: false,
         deadLetterQueue: dlQueue
       })
     );

  }
}
