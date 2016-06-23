/* build-bitwise.js
 * builds the 3 bitwise ops
 * this has dirty coercion tricks, unfortunately
 */

var fs = require("fs");

var ops = ["EOR", "ORA", "AND"];
ops.forEach(emit);

function emit(op) {
    var emission = [
        "R,N,Z,A",
        "set hA to item A+1 of hex",
        "set hOP to item OP+1 of hex",
        "set A to join (item (join (letter 1 of A) (letter 1 of OP))+1 of " + op + ") (item (join (letter 2 of A) (letter 2 of OP))+1 of " + op + ")"
    ];

    fs.writeFileSync("instructions/" + op, emission.join("\n"));

}
