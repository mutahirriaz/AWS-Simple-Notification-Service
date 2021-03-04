import * as cdk from '@aws-cdk/core';
import * as events from "@aws-cdk/aws-events";
import * as lambda from "@aws-cdk/aws-lambda"
import * as targets from "@aws-cdk/aws-events-targets";
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import * as sns from "@aws-cdk/aws-sns";
import * as sqs from "@aws-cdk/aws-sqs";

export class PublishUsingEventStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const lambdaFn = new lambda.Function(this, "producerLambda", {
      code: lambda.Code.fromAsset("lambda"),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "producer.hadler"
    });

    events.EventBus.grantPutEvents(lambdaFn)

    // create an SNS Topic

    const myTopic = new sns.Topic(this, "MyTopic");

     // create a dead letter queue
     const dlQueue = new sqs.Queue(this, "DeadLetterQueue", {
      queueName: "MySubscription_DLQ",
      retentionPeriod: cdk.Duration.days(14),
    });

    myTopic.addSubscription(
      new subscriptions.EmailSubscription("mutahirriaz2@gmail.com",{
        json: false,
        deadLetterQueue: dlQueue,
      })
    );

    // create a rult to publish events on SNS topic
    const rule = new events.Rule(this, "BridgeRule", {
      eventPattern: {
        source: ["producerLambda"], // every event that has source = "eru-appsync-events" will be sent to SNS topic
      },
    });

    // add the topic as a target to the rule created above
    rule.addTarget(new targets.SnsTopic(myTopic));

  }
}