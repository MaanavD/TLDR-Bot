const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const https = require('https');
/**
* /hello

* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/


module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
  callback(null, {
    text: `Hey, <@${user}>, I see you need an update on the past ${text} Messages.\n`,
    attachments: [
      {
        "fallback": "Required plain-text summary of the attachment.",
        "color": "#ffe4e1",
        "pretext": "Here's what I was able to come up with:",
        // "author_name": "Bobby Tables",
        // "author_link": "http://flickr.com/bobby/",
        // "author_icon": "http://flickr.com/icons/bobby.jpg",
        // "title": "Slack API Documentation",
        // "title_link": "https://api.slack.com/",
        "text": "Optional text that appears within the attachment",
        // "fields": [
        //     {
        //         "title": "Priority",
        //         "value": "High",
        //         "short": false
        //     }
        // ],
        // "image_url": "http://my-website.com/path/to/image.jpg",
        // "thumb_url": "http://example.com/path/to/thumb.png",
        "footer": "Brought to you by the TLDR Bot Team",
        // "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
        "ts": Math.round((new Date()).getTime() / 1000)
    }
      // You can customize your messages with attachments.
      // See https://api.slack.com/docs/message-attachments for more info.
    ]
  });
};
