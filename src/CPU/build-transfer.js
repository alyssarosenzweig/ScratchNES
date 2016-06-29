/* builds TAX-family instructions */
/* note these get a little funky because of differences in encoding */

var fs = require("fs");

var list = ["AX", "AY", "SX", "XA", "XS", "YA"];
list.forEach(emit);

function emit(name) {
    var emission = [
        "IMPLIED"
    ];

    emission.push("set " + name[1] + " to " + name[0]);

    fs.writeFileSync("instructions/T" + name, emission.join("\n"));
}
