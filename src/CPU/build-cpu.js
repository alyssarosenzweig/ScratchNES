/* build-cpu.js
 * this is the heart of the metaprogram
 * at the entrypoint, the instruction set is complete and annotated,
 * and the reference document is available.
 * We can just sit back, relax, and put together parts :-)
 */

var fs = require("fs");

// avoid excessive disk use
var instruction_cache = {};

// read the table in
var table = JSON.parse(fs.readFileSync("bin/table.json").toString());

// jump table emission, etc.
var emission = [
    "mapper read PC",
    "set tmp to join \"0x\" (M)"
];

var sources = table.map(function(x) {
    if(x) {
        return "legit";
    } else {
        return "illegit";
    });

// dump out a 8 level deep BST
console.log(bst(sources, 0, 256));

function bst(sources, start, end) {
    
}
