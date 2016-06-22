/**
 * parse-reference.js
 * argv[2] is a text-only 6502 reference sheet
 */

var fs = require("fs");

var reference = fs.readFileSync(process.argv[2])
                  .toString()
                  .split("\n");

// an instruction is delimited by a character on column 0
// split into instructions

var instructions = [[]];
var temp = 0;

for(var i = 0; i < reference.length; ++i) {
    if(reference[i].length == 0 || reference[i][0] == " ") {
        instructions[temp].push(reference[i]);
    } else {
        instructions.push([reference[i]]);
        ++temp;
    }
}

// remove car
instructions = instructions.slice(1);

console.log(instructions.map(parseInstruction));

function parseInstruction(instruction) {
    return instruction; // stub
}
