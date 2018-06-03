httpGet('https://slack.com/api/channels.history?token=xoxp-371545814469-374146134465-374779681874-8c3e46c40c33f834ccc6ffe9d546ae2a&channel=CAXBZULM8&pretty=1', function(message) {process(message);});

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

function process(response) {
    let unfilteredMessagesArray = JSON.parse(response).messages;
    let output = [];
    for (let i = 0; i < unfilteredMessagesArray.length; i ++) {
        if (unfilteredMessagesArray[i].type === "message") {
            if (response.messages[i].subtype === "bot_message") {
                if (response.messages[i].username === "") {
                    response.messages[i].sender = response.messages[i].username;
                } else {
                    response.messages[i].sender = displaybot(response.messages[i].bot_id);
                }
            }
            response.messages[i].sender = displayname(response.messages[i].user);
            output.push(unfilteredMessagesArray[i]);
        }
    }
    return (output);
}

function displayuser(id) {
    // make request to users.info with id and get response
    if (response.user.profile.display_name === "") {
        return response.user.profile.real_name;
    }
    return response.user.profile.display_name;
}

function displaybot(id) {
    // make request to bots.info with id and get response
    return response.bot.name;
}
