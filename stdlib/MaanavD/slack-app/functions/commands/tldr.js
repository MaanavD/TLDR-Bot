const lib = require('lib')({ token: process.env.STDLIB_TOKEN });
const https = require('https');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
/**
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/

module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {

    function httpGet(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.responseText);
            }
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    }

    var out;

    httpGet('https://slack.com/api/channels.history?token=xoxp-371545814469-374146134465-374779681874-8c3e46c40c33f834ccc6ffe9d546ae2a&channel=CAXBZULM8&pretty=1', function(response) {
        var unfiltered = JSON.parse(response).messages;
        var message = [];
        for (let i = 0; i < unfiltered.length; i ++) {
            if (unfiltered[i].type === "message" && unfiltered[i].subtype != "bot_message") {
                message.push(unfiltered[i]);
            }
        }

        var want = new Array(message.length).fill(false);
        var attach = [{
            "color": "#ffe4e1",
            "pretext": "Here's what I was able to come up with:",
            "author_name": message[0].user,
            "text": message[0].text
        }];

        for (let i = 1; i < message.length; i ++) {
            attach.unshift({
                "color": "#ffe4e1",
                "author_name": message[i].user,
                "text": message[i].text
            })
        }

        callback(null, {
            text: `Hey, <@${user}>, I see ${out} you need an update on the past ${text} Messages.\n`,
            attachments: attach;
        });
    });
};
