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
    "set tmp to join \"0x\" (M)"
];

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
            "if tmp = " + start + " then",
                sources[start],
            "else",
                sources[end],
            "end"
            ];

    var emission = ["if tmp < " + (start+end+1)/2 + " then"]
        .concat(bst(sources, start, start + (end-start-1) / 2))
        .concat(["else"])
        .concat(bst(sources, start + (end-start+1) / 2, end))
        .concat(["end"]);

    return emission;
}
