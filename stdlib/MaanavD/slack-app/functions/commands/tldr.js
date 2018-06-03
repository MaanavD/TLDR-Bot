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

    var token = 'xoxp-371545814469-374465758244-374746016499-37dee26c967e4a59f6a1d5635033e31c';
    var channel = 'CB040QE8G';

    try {
        var msgNum = parseInt(text);
    } catch (err) {
        var msgNum = 1024;
    }

    function httpGet(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.responseText);
            }
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    }

    var out;

    httpGet('https://slack.com/api/users.list?token=' + token + '&pretty=1', function (response) {
        var memberList = JSON.parse(response).members;

        httpGet('https://slack.com/api/channels.history?token=' + token + '&channel=' + channel + '&pretty=1', function (response) {
            var unfiltered = JSON.parse(response).messages;
            var message = [];

            if (msgNum > unfiltered.length) {
                msgNum = unfiltered.length;
            }

            for (let i = 0; i < msgNum; i++) {
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

            var keywords = [{ "text": "\\?", "after": 3 }];
            byContent(message, keywords);

            var trange = 10000;
            byFrequency(message);

            var minLength = 128;
            byLength(message);

            var stubLength = 32;
            removeShort(message);

            var minReactions = 3;
            byReactions(message);

            function byContent(a, b) {
                for (let t = 0; t < b.length; t++) {
                    for (let i = 0; i < a.length; i++) {
                        if (a[i].text.search(b[t].text) != -1) {
                            for (let j = 0; j <= b[t].after; j++) {
                                want[i + j] = true;
                            }
                        }
                    }
                }
            }

            function byFrequency(a) {
                for (let i = 1; i < a.length; i++) {
                    if ((a[i].ts - a[i - 1].ts) <= trange) {
                        want[i] = true;
                        want[i - 1] = true;
                    }
                }
            }

            function byLength(a) {
                for (let i = 0; i < a.length; i++) {
                    if (a[i].text.length >= minLength) {
                        want[i] = true;
                    }
                }
            }

            function removeShort(a) {
                for (let i = 0; i < a.length; i++) {
                    if (a[i].text.length < stubLength) {
                        want[i] = false;
                    }
                }
            }

            function byReactions(a) {
                for (let i = 0; i < a.length; i++) {
                    a[i].reactioncount = 0;
                    if (a[i].reactions != undefined) {
                        for (let j = 0; j < a[i].reactions.length; j++) {
                            a[i].reactioncount += a[i].reactions[j].count;
                        }
                        if (a[i].reactioncount >= minReactions) {
                            want[i] = true;
                        }
                    }
                }
            }

            var final = [];
            for (let i = 0; i < message.length; i++) {
                if (want[i]) {
                    final.push(message[i]);
                }
            }

            function displayname(idNum) {
                for (let i = 0; i < memberList.length; i++) {
                    if (memberList[i].id == idNum) {
                        return memberList[i].real_name;
                    }
                }
                return 'Unnamed User';
            }

            if (final.length > 0) {
                var attach = [];
                for (let i = 1; i < final.length - 1; i++) {
                    attach.unshift({
                        "color": "#ffe4e1",
                        "title": displayname(final[i].user),
                        "text": final[i].text,
                        "ts": final[i].ts
                    })
                }

                attach.unshift({
                    "color": "#ffe4e1",
                    "pretext": "Here's what I was able to come up with:",
                    "title": displayname(final[final.length - 1].user),
                    "text": final[final.length - 1].text,
                    "ts": final[final.length - 1].ts
                });
                
                callback(null, {
                    text: `Hey, <@${user}>, I see you need an update on the past ${text} messages.\n`,
                    attachments: attach
                });
            } else {
                callback(null, {
                    text: `Unfortunately it seems like nothing interesting happened in the past ${text} messages.`
                });
            }
        });
    });
};