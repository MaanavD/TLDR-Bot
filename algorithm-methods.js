// assigns reactions
function assignreactions(a) {
    var
}

// counts number of reactions
function searchStringInArrayD(a) {
    var output = [];
    for (let i = 0; i < messages.length; i ++) {
        a[i].reactioncount = 0;
        if (a[i].reactions != undefined) {
            for (let j = 0; j < a[i].reactions.length; j ++) {
                a[i].reactioncount += a[i].reactions[j].count;
            }
            if (a[i].reactioncount >= 3) {
                want[i] = true;
            }
        }
    }
    return output;
}

// selection sort
function sort(a) {
    for (let i = 0; i < a.length; i ++) {
        var max = i;
        for (let j = i + 1; j < a.length; j++) {
            if (a[j].length > a[max].length)
                max = j;
            }
        var temp = a[i];
        a[i] = a[max];
        a[max] = temp;
    }
    return a;
}
