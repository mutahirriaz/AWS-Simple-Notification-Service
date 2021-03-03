import * as cdk from '@aws-cdk/core';
import * as sns from "@aws-cdk/aws-sns";
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import { SubscriptionProtocol } from "@aws-cdk/aws-sns";


export class HttpsSubscriptionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const LambdaFn = new lambda.Function(this, "LambdaHandler", {
      code: lambda.Code.fromAsset("lambda"),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "hello.handler",
    });

    // create an endpoint for the lambda function
    const api = new apigw.LambdaRestApi(this, "Endpoint", {
      handler: LambdaFn,
    });

    // create an sns topic for sending the message
    const myTopic = new sns.Topic(this, "MyTopic");

    // The following command subscribes our endpoint(connected to lambda) to the SNS topic
    myTopic.addSubscription(
      new subscriptions.UrlSubscription(api.url, {
        protocol: SubscriptionProtocol.HTTPS
      })
    );

  }
}
