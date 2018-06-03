var messages = ["LOL Yathin is a...", "Life suks", "Turner Hacks WTH", ":)", "ajdkfa fskjf", "where u goin?", "home", "ur mom", "his mom", "I hate life :(", "meme 83829?!",
"Indium is a chemical element with symbol In and atomic number 49. It is a post-transition metal that makes up 0.21 parts per million of the Earth's crust?!",
"Indium has no biological role, though its compounds are somewhat toxic when injected into the bloodstream. Most occupational exposure is through ingestion,",
"Hello world", "Indium has no biological role, though its compounds are somewhat toxic w","Indium has no biological role, though its compounds are somewhat ", "Indium has no biological role, though its co",
"Indium has no biological role, though its compounds are somewhat toxic wuyfeidvnjrywdjnewyfuisd","efdkl.jkrhjdhkjghrdjkh?"];

var n = 3; // returns the n messages following the one containing the important keyword

var keywords = ["Indium", "mom"];
var important = new Array(keywords.length).fill(false);
keywords.push("\\?");
important.push(true);

var used = new Array(messages.length).fill(true);
console.log(searchStringInArrayA(messages, keywords));

function searchStringInArrayA (a,b) {
    var output = [];
    for (let t = 0; t < b.length; t ++) {
        for (let i = 0; i < a.length; i ++) {
            if (a[i].search(b[t]) != -1) {
                if (used[i]) {
                    output.push(a[i]);
                    used[i] = false;
                }
                if (important[t]) {
                    for (let j = 1; (j <= n) && (i + j < a.length); j ++) {
                        if (used[i+j]) {
                            output.push(a[i+j]);
                            used[i+j] = false;
                        }
                    }
                }
            }
        }
    }
    return output;
}
