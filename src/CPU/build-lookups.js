/*
 * build-lookups.js
 * builds lookup tables for bitwise operations
 */

var fs = require("fs");

emit("EOR", function(a,b){return a^b});
emit("ORA", function(a,b){return a|b});
emit("AND", function(a,b){return a&b});
emit("hex", function(a,b){return ("00" + ((a<<4)|b).toString(16)).substr(-2, 2)});
emit("bitmask", function(a,b){return ("00000000"+((a<<4)|b).toString(2)).substr(-8,8)});
emit("obitmask", function(a,b){return "1" + (("00000000"+((a<<4)|b).toString(2)).substr(-8,8))});
emit("dobitmask", function(a,b){return 2 * ("1" + (("00000000"+((a<<4)|b).toString(2)).substr(-8,8)))});

function emit(name, func) {
    var emission = [];

    for(var i = 0; i < 256; ++i) {
        var a = (i & 0xF0) >> 4;
        var b = (i & 0x0F) >> 0;
        emission.push(func(a,b));
    }

    fs.writeFileSync("bin/" + name + ".txt", emission.join("\n"));
}
