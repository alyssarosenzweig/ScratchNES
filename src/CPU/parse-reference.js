/**
 * parse-reference.js
 * argv[2] is a text-only 6502 reference sheet
 */

var fs = require("fs");
PolyFill();

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

var bar = '     --------------------------------------------';

function parseInstruction(instruction) {
    // get instruction name
    var name = instruction[0].split(" ")[0];

    // find the opcode list
    var nums = instruction.findIndex(function(el) {
        return el.indexOf("---------") > -1;
    });

    return {
        "name": name,
        "forms": instruction.slice(nums + 1, -2)
    };
}

function PolyFill() {
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}
}
