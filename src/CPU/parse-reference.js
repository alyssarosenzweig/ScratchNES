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

var opcodes = [];
for(var i = 0; i < instructions.length; ++i) {
    opcodes = opcodes.concat(parseInstruction(instructions[i]));
}

console.log(opcodes);

function parseInstruction(instruction) {
    // get instruction name
    var name = instruction[0].split(" ")[0];

    // find the opcode list
    var nums = instruction.findIndex(function(el) {
        return el.indexOf("---------") > -1;
    });

    var forms = instruction.slice(nums + 1, -2).map(function(form) {
        var addressing = form.slice(6-1, 20-1).trim();
        var assembler = form.slice(20-1, 34-1).trim();
        var opcode = ("0x" + form.slice(34-1, 40-1).trim()) * 1;
        var size = form.slice(40-1, 46-1) * 1;
        var cycles = form.slice(46-1).trim();

        return {
            "name": name,
            "addressing": addressing,
            "size": size,
            "opcode": opcode,
            "cycles": cycles
        };
    });

    return forms;
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
