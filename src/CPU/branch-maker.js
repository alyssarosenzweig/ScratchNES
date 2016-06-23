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
    var flagNum = value ? "flag" + flag
                        : "(1 - flag" + flag + ")";

    emission.push(
            "change PC by " +
            flagNum +
            " * ((join \"0x\" (M)) + 256 * (<(join \"0x\" (M)) < 128> - 1))"
    );

    fs.writeFileSync("instructions/" + name, emission.join("\n"));
}

for(var flag in branches) {
    emit(branches[flag][0], flag, false);
    emit(branches[flag][1], flag, true);
}
