import {EventBridge} from 'aws-sdk'

exports.handler = async function() {

    const eventBridge = new EventBridge({region: 'us-east-1'});

    try{
        const data = await eventBridge.putEvents({
            Entries: [
                {
                    EventBusName: "default",
                    Source: "producerLambda",
                    DetailType: "test",
                    Detail: `{"test": "hello"}`
                },
            ],
        }).promise()

        console.log("data ==>>", data)

    }
    catch(error){
        console.log(error)
    }

}