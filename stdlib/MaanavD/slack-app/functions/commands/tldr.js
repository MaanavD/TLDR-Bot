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

    var token = 'xoxp-371545814469-374465758244-375880975175-7cd41db99d5b4c303d6d681d32adc97a';
    var channel = 'CB040QE8G';

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

    httpGet('https://slack.com/api/channels.history?token=' + token + '&channel=' + channel + '&pretty=1', function(response) {
        var unfiltered = JSON.parse(response).messages;
        var message = [];
        for (let i = 0; i < unfiltered.length; i ++) {
            if (unfiltered[i].type === "message"
            && unfiltered[i].subtype != "bot_message"
            && unfiltered[i].subtype != "channel_join"
            && unfiltered[i].subtype != "channel_leave"
            && unfiltered[i].subtype != "group_join"
            && unfiltered[i].subtype != "group_leave"
            && unfiltered[i].subtype != "unpinned_item") {
                message.push(unfiltered[i]);
            }
        }

        var want = new Array(message.length).fill(false);

        var keywords = [{"text": "\\?", "after": 3}];
        byContent(message, keywords);

        var trange = 5000;
        byFrequency(message);

        minLength = 128;
        byLength(message);

        minReactions = 3;
        byReactions(message);

        function byContent(a, b) {
            for (let t = 0; t < b.length; t ++) {
                for (let i = 0; i < a.length; i ++) {
                    if (a[i].text.search(b[t].text) != -1) {
                        for (let j = 0; j <= b[t].after; j ++) {
                            want[i + j] = true;
                        }
                    }
                }
            }
        }

        function byFrequency(a) {
            for (let i = 1; i < a.length; i ++) {
                if ((a[i].ts - a[i - 1].ts) <= trange) {
                    want[i] = true;
                    want[i - 1] = true;
                }
            }
        }

        function byLength(a) {
            for (let i = 0; i < a.length; i ++) {
                if (a[i].length >= minLength) {
                    want[i] = true;
                }
            }
        }

        function byReactions(a) {
            for (let i = 0; i < a.length; i ++) {
                a[i].reactioncount = 0;
                if (a[i].reactions != undefined) {
                    for (let j = 0; j < a[i].reactions.length; j ++) {
                        a[i].reactioncount += a[i].reactions[j].count;
                    }
                    if (a[i].reactioncount >= minReactions) {
                        want[i] = true;
                    }
                }
            }
        }
        
        function displayuser(id) {
            var out;
            httpGet('https://slack.com/api/users.info?token=' + token + '&user=' + id + '&pretty=1', out = function(response) {
                if (response.user.profile.display_name === "") {
                    return response.user.profile.real_name;
                }
                return response.user.profile.display_name;
            }
            return out;
        }

        var final = [];
        for (let i = 0; i < message.length; i ++) {
            if (want[i]) {
                final.push(message[i]);
            }
        }

        var attach = [{
            "color": "#ffe4e1",
            "pretext": "Here's what I was able to come up with:",
            "author_name": displayuser(final[0].user),
            "text": final[0].text
        }];

        for (let i = 1; i < message.length; i ++) {
            attach.unshift({
                "color": "#ffe4e1",
                "author_name": displayuser(final[i].user),
                "text": final[i].text
            })
        }

        callback(null, {
            text: `Hey, <@${user}>, I see you need an update on the past ${text} Messages.\n`,
            attachments: attach
        });
    });
};
