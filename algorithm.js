var want = new Array(input.length).fill(false);

var keywords = [{"text": "\\?", "after": 3}];
byContent(input, keywords);

var trange = 5000;
byFrequency(input);

minLength = 128;
byLength(input);

minReactions = 3;
byReactions(input);

// final output
for (let i = 0; i < input.length; i ++) {
    if (want[i]) {
        console.log(input[i]);
    }
}

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
