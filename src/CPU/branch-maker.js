/**
 * branch-maker.js
 * look at the name
 * it makes branches :P
 */

var fs = require("fs");

// flag: [clear, set]

var branches = {
    "C": ["BCC", "BCS"],
    "Z": ["BNE", "BEQ"],
    "V": ["BVC", "BVS"],
    "N": ["BPL", "BMI"]
};

function emit(name, flag, value) {
    var emission = [];

    // header
    emission.push("BRANCH");
    emission.push("mapper read PC+1");

    // emission
    var flagNum = value ? flag : "(1 - " + flag + ")";

    emission.push(
            "change PC by " +
            flagNum +
            " * (M + 256 * (<M < 128> - 1))"
    );

    console.log(emission.join("\n"));
}

for(var flag in branches) {
    emit(branches[flag][0], flag, 0);
    emit(branches[flag][1], flag, 0);
}
