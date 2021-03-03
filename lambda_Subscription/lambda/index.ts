import {SNSEvent} from 'aws-lambda';

export async function handler(event: SNSEvent){

    console.log(event.Records[0].Sns)

}