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
        'set A to join "0x" join (item (join "0x" (join (letter 1 of hA) (letter 1 of hOP)))+1 of ' + op + ') (item (join "0x" (join (letter 2 of hA) (letter 2 of hOP)))+1 of ' + op + ')'

    ];

    fs.writeFileSync("instructions/" + op, emission.join("\n"));

}
