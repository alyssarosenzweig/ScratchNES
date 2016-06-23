/* INC style instructions */

var fs = require("fs");

var registers = {
    "M": ["INC", "DEC"],
    "X": ["INX", "DEX"],
    "Y": ["INY", "DEY"]
};

for(var reg in registers) {
    emit(reg, registers[reg][0], 0);
    emit(reg, registers[reg][1], 1);
}

function emit(register, name, value) {
    var emission = [];

    if(register == "M") {
        emission.push("RW, N, Z");
        emission.push("set OP to item (((join \"0x\" (OP)) " + (value ? "-" : "+") + " 1) mod 256) of hex");
    } else {
        emission.push("IMPLIED");
        emission.push("set " + register + " to item (((join \"0x\" (" + register + "))" + (value ? "-1" : "1") + ") mod 256) of hex");
    }

    fs.writeFileSync("instructions/" + name, emission.join("\n"));
}
