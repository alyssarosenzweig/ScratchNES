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
