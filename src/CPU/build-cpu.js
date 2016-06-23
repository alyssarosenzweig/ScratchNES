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

table = table.slice(0, 4);

var sources = table.map(function(x, i) {
    if(x) {
        var instruction = [];

        // add stub for addressing mode
        // load if not already in-memory

        if(!addressing_cache[x.addressing]) {
            addressing_cache[x.addressing] =
                fs.readFileSync("addressing/" + x.addressing)
                    .toString().split("\n");
        }

        instruction = instruction.concat(addressing_cache[x.addressing]);

        // add stub for instruction
        if(!instruction_cache[x.name]) {
            instruction_cache[x.name] =
                fs.readFileSync("instructions/" + x.name)
                    .toString().split("\n");
        }

        // follow the flags
        var flags = instruction_cache[x.name][0].replace(/ /g, '').split(',');
        var negQ = false, zeroQ = false, mode = null, operand = null;

        flags.forEach(function(flag) {
            if(flag == "N") negQ = true;
            else if(flag == "Z") zeroQ = true;
            else if(["R", "RW", "IMPLIED", "RAW", "BRANCH"].indexOf(flag) > -1)
                mode = flag;
            else if (["A", "X", "Y", "tmp"].indexOf(flag) > -1)
                operand = flag;
            else
                console.error("Unknown flag " + flag + " for instruction " + x.name);
        });

        console.log(mode);

        // add the actual code of the instruction
        instruction = instruction.concat(instruction_cache[x.name].slice(1));

        instruction = instruction.concat([
            'say "' + x.assembler + '" for 2 secs',
            'change PC by ' + x.size
        ]);

        return instruction.join("\n");
    } else {
        return [
            'say "Illegal Opcode ' + i + ' used, ignoring." for 2 secs',
            'change PC by 1'
        ].join("\n");
    }
});

// dump out an 8 level deep BST
console.log(bst(sources, 0, 3).join('\n'));

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
