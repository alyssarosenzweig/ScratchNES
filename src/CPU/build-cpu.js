/* build-cpu.js
 * this is the heart of the metaprogram
 * at the entrypoint, the instruction set is complete and annotated,
 * and the reference document is available.
 * We can just sit back, relax, and put together parts :-)
 */

var fs = require("fs");

// avoid excessive disk use
var instruction_cache = {};
var addressing_cache = {};

// read the table in
var table = JSON.parse(fs.readFileSync("bin/table.json").toString());

// jump table emission, etc.
var emission = [
    "mapper read PC",
    "set opcode to M"
];

var sources = table.map(function(x, i) {
    if(x) {
        var instruction = [];

        // add stub for addressing mode
        // load if not already in-memory

        if(!addressing_cache[x.addressing]) {
            addressing_cache[x.addressing] =
                fs.readFileSync("addressing/" + x.addressing)
                    .toString().trim().split("\n");

            if(addressing_cache[x.addressing][0].trim().length == 0)
                addressing_cache[x.addressing] = [];
        }

        instruction = instruction.concat(addressing_cache[x.addressing]);

        // add stub for instruction
        if(!instruction_cache[x.name]) {
            instruction_cache[x.name] =
                fs.readFileSync("instructions/" + x.name)
                    .toString().trim().split("\n");
        }

        // follow the flags
        var flags = instruction_cache[x.name][0].replace(/ /g, '').split(',');
        var negQ = false, zeroQ = false, carryQ = false, mode = null, operand = null;

        flags.forEach(function(flag) {
            if(flag == "N") negQ = true;
            else if(flag == "Z") zeroQ = true;
            else if(flag == "C") carryQ = true;
            else if(["R", "RW", "IMPLIED", "RAW", "BRANCH", "W"].indexOf(flag) > -1)
                mode = flag;
            else if (["A", "X", "Y", "tmp", "OP"].indexOf(flag) > -1)
                operand = flag;
            else
                console.error("Unknown flag " + flag + " for instruction " + x.name);
        });

        var ins = instruction_cache[x.name].slice(1);

        if(mode == "R") {
            instruction.push("mapper read address");
            instruction.push("set OP to M");
        } else if(mode == "RW") {
            if(x.addressing == "accumulator") {
                operand = "A";
                ins = ins.map(function(q) {
                    return q.replace(/OP/g, "A");
                });
            } else {
                instruction.push("mapper read address");
                instruction.push("set OP to M");
            }

            ins = ins.map(function(q) {
                if(x.addressing != "accumulator") {
                    return q.replace(/set OP to/, "mapper write address");
                } else {
                    return q;
                }
            });
        } else if(mode == "W") {
            ins = ins.map(function(q) {
                return q.replace(/set OP to/, "mapper write address");
            });
        } else if(mode == "RAW") {
            ins = ins.map(function(q) {
                return q.replace(/OP/g, "address");
            });
        } else if(mode == "IMPLIED" || mode == "BRANCH") {

        } else {
            console.error("Unsupported mode " + mode);
        }

        // add the actual code of the instruction
        instruction = instruction.concat(ins);

        if(negQ) {
            instruction.push("set flagN to <" + operand + " > 127>");
        }

        if(zeroQ) {
            instruction.push("set flagZ to <" + operand + " = 0>");
        }

        if(carryQ) {
            instruction.push("set flagC to <" + operand + " > 255 or " + operand + " < 0>");
        }

        instruction.push('say "' + x.assembler + '" for 2 secs');

        if(x.name != "JMP") {
            instruction.push("change PC by " + x.size);
        }

        return instruction.join("\n");
    } else {
        return [
            'say "Illegal Opcode ' + i + ' used, ignoring." for 2 secs',
            'change PC by 1'
        ].join("\n");
    }
});

// dump out an 8 level deep BST
console.log(bst(sources, 0, 255).join('\n'));

function bst(sources, start, end) {
    if(start == end)
        return [sources[start]];

    if(start + 1 == end)
        return [
            "if opcode = " + start + " then",
                sources[start],
            "else",
                sources[end],
            "end"
            ];

    var emission = ["if opcode < " + (start+end+1)/2 + " then"]
        .concat(bst(sources, start, start + (end-start-1) / 2))
        .concat(["else"])
        .concat(bst(sources, start + (end-start+1) / 2, end))
        .concat(["end"]);

    return emission;
}
