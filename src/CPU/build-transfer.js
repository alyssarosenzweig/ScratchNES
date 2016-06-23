/* builds TAX-family instructions */
/* note these get a little funky because of differences in encoding */

var fs = require("fs");

var list = ["AX", "AY", "SX", "XA", "XS", "YA"];
list.forEach(emit);

function emit(name) {
    var emission = [
        "IMPLIED"
    ];

    if(name.indexOf("S") > -1) {
        if(name[0] == "S") {
            // transfer stack in
            // encode it to hex
            emission.push("set " + name[0] + "to item (" + name[1] + "+1) of hex");
        } else {
            // transfer stack out
            // decode hex
            emission.push("set " + name[0] + "to (join \"0x\" (" + name[1] + "))");
        }
    } else {
        emission.push("set " + name[0] + " to " + name[1]);
    }

    fs.writeFileSync("instructions/T" + name, emission.join("\n"));
}
