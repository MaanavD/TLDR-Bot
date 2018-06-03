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

    var out;
    var ihatenode = function httpGet(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.responseText);
            }
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    };

    httpGet('https://slack.com/api/channels.history?token=xoxp-371545814469-374146134465-374779681874-8c3e46c40c33f834ccc6ffe9d546ae2a&channel=CAXBZULM8&pretty=1', function(message) {out = message);});
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
                "text": out,
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
        ]
  });
};
