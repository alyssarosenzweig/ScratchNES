/**
 * emits clc-family instructions
 */

var fs = require("fs");

var flags = {
    "C": ["CLC", "SEC"],
    "D": ["CLD", "SED"],
    "I": ["CLI", "SEI"],
    "V": ["CLV", null],
};

for(var flag in flags) {
    if(flags[flag][0]) emit(flags[flag][0], flag, 0);
    if(flags[flag][1]) emit(flags[flag][1], flag, 1);
}

function emit(name, flag, value) {
    var emissions = [
        "IMPLIED",
        "set flag" + flag + " to " + value
    ];

    fs.writeFileSync("instructions/" + name, emissions.join("\n"));
}
