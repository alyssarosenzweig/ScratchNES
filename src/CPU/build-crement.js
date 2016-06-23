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
        emission.push("RW, N, Z, OP");
        emission.push("set OP to (OP " + (value ? "-" : "+") + " 1) mod 256");
    } else {
        emission.push("IMPLIED," + register + ",N,Z," + register);
        emission.push("set " + register + " to (" + register + " " + (value ? "-" : "+") + " 1) mod 256");
    }

    fs.writeFileSync("instructions/" + name, emission.join("\n"));
}
