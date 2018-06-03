const {WebClient} = require('@slack/client');
var SLACK_TOKEN = {
    "token" : "xoxb-371545814469-375812478375-2CzUzshmPET193yXVqp9Lwuq",
    "text" : "Approved! you are a winner!"
  }
const token = process.env.SLACK_TOKEN;


const web = new WebClient(token);

const conversationId = 'GB06G3ERX';

web.chat.postMessage({ channel: conversationId, text: 'Hello there' })
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);