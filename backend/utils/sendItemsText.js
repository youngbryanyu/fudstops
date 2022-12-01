// util for sending text message
require("dotenv").config(); // required for env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// send text
module.exports = async (toPhoneNumber, text) => {
    const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // twilio number

    try {
        await client.messages.create({
            body: text,
            to: toPhoneNumber,
            from: fromPhoneNumber
        }).catch(error => console.log(error))
    } catch (error) {
        return error;
    }
};
