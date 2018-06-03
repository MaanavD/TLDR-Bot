var input = [
    {
        "type": "message",
        "ts": "1358546515.000008",
        "user": "U2147483896",
        "text": "Hello dgasdfsdfjskfdskfjas kfj askjfsdfjdkfksadfhs dfhjsjf hsjfhjsdfhasj fhjshfja sdfafdhajkhdfjkasdfh kjsafh jsdfhjsfh jshfjsakfh jaksdhklajh fshdf jshfsjkfh asjkdfh asjkdfh sdjkfhasjkfhasjkfhsjkd afhjkasfh"
    },
    {
        "type": "message",
        "ts": "1358553515.000008",
        "user": "U2147483896",
        "text": "Hello "
    },
    {
        "type": "message",
        "ts": "1358556515.000008",
        "user": "U2147483896",
        "text": "Hello"
    },
    {
        "type": "message",
        "ts": "1358557515.000007",
        "user": "U2147483896",
        "text": "waz good",
        "is_starred": true,
        "reactions": [
            {
                "name": "space_invader",
                "count": 1,
                "users": [
                    "U1",
                    "U2",
                    "U3"
                ]
            },
            {
                "name": "sweet_potato",
                "count": 1,
                "users": [
                    "U1",
                    "U2",
                    "U3",
                    "U4",
                    "U5"
                ]
            }
        ]
    },
    {
        "type": "message",
        "ts": "1358567515.000007",
        "user": "U2147483896",
        "text": "yea 200",
        "is_starred": true,
        "reactions": [
            {
                "name": "space_invader",
                "count": 3,
                "users": [
                    "U1",
                    "U2",
                    "U3"
                ]
            },
            {
                "name": "sweet_potato",
                "count": 5,
                "users": [
                    "U1",
                    "U2",
                    "U3",
                    "U4",
                    "U5"
                ]
            }
        ]
    },
    {
        "type": "message",
        "ts": "1358575515.000007",
        "user": "U2147483896",
        "text": "i swear it was there last year",
        "is_starred": true,
        "reactions": [
            {
                "name": "space_invader",
                "count": 2,
                "users": [
                    "U1",
                    "U2",
                    "U3"
                ]
            },
            {
                "name": "sweet_potato",
                "count": 5,
                "users": [
                    "U1",
                    "U2",
                    "U3",
                    "U4",
                    "U5"
                ]
            }
        ]
    }
];

/*
1. Get input as messages[]
2. Sort messages decreasing by length
3. Add first however many messages
4. Test remaining messages for string match
5. Test remaining messages for reactions
*/

var messages = [];
for (let i = 0; i < input.length; i++)
    messages.push(input[i].text);
var timestamps = [];
for (let i = 0; i < input.length; i++)
    timestamps.push(input[i].ts)

var output = [];

var want = new Array(input.length).fill(false);

var output2 = searchStringInArrayB(timestamps);
var output3 = searchStringInArrayC(messages);
reactions(input);
var finaloutput = [];
for (let i = 0; i < output1.length; i++)
finaloutput.push (output1[i]);
for (let i = 0; i < output2.length; i++)
finaloutput.push (output2[i]);
for (let i = 0; i < output3.length; i++)
finaloutput.push (output3[i]);
for (let i = 0; i < output4.length; i++)
finaloutput.push (output4[i]);
var finaloutput2 = sort (finaloutput);

// final output
for (let i = 0; i < finaloutput.length; i ++) {
    console.log(input[finaloutput2[i]].ts + "\t" + input[finaloutput2[i]].user + ":\t" + input[finaloutput2[i]].text);
}

var keywords = [];
var important = [];
for (let i = 0; i < keywords.length; i++)
    important.push(false);

keywords.push("\\?");
important.push(true);
var trange = 5000;

var output1 = searchStringInArrayA(messages, keywords);
// searches for strings containing key words
function searchStringInArrayA(a, b) {
    var output = [];
    for (let t = 0; t < b.length; t++) {
        for (let i = 0; i < a.length; i++) {
            if (a[i].search(b[t]) != -1) {
                if (notrepeat[i]) {
                    output.push(i);
                    notrepeat[i] = false;
                }
                if (important[t]) {
                    for (let j = 1; (j <= n) && (i + j < a.length); j++) {
                        if (notrepeat[i + j]) {
                            output.push(i + j);
                            notrepeat[i + j] = false;
                        }
                    }
                }
            }
        }
    }
    return output;
}

function searchStringInArrayB(a) {
    var output = [];
    for (let i = 0; i < (a.length - 1); i++) {
        if ((a[i + 1] - a[i]) <= trange) {
            if (notrepeat[i]) {

                output.push(i);
                notrepeat[i] = false;
            }
        }
        else if ((a[i] - a[i - 1]) <= trange) {
            if (notrepeat[i]) {
                output.push(i);
                notrepeat[i] = false;
            }
        }
    }
    return output;
}
