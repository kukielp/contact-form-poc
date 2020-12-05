import AWS from 'aws-sdk';

const ses = new AWS.SES();
const RECEIVER = 'To Email address';
const SENDER = 'Fromt email address';

const response = {
    "isBase64Encoded": false,
    "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    "statusCode": 200,
    "body": "{\"result\": \"Success.\"}"
};

exports.handler =  async (event) => {
    console.log('Received event:', event.body);
    const result = await sendMail(JSON.parse(event.body));
    console.log(`MessageId: ${result.MessageId} succesfully sent`);
    return response
};

async function sendMail (enquiryPaylod) {
    const params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: `name: ${enquiryPaylod.name} \nemail: ${enquiryPaylod.email} \ndesc: ${enquiryPaylod.desc}`,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: `Website Referral Form: ${enquiryPaylod.name}`,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    return await ses.sendEmail(params).promise();
}