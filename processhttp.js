function process(response) {
    let output = [];
    for (let i = 0; i < response.messages.length; i ++) {
        if (response.messages[i].type === "message") {
            // if (response.messages[i].subtype === "bot_message") {
            //     if (response.messages[i].username === "") {
            //         response.messages[i].sender = response.messages[i].username;
            //     } else {
            //         response.messages[i].sender = displaybot(response.messages[i].bot_id);
            //     }
            // }
            // response.messages[i].sender = displayname(response.messages[i].user);
            output.push(response.messages[i]);
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
