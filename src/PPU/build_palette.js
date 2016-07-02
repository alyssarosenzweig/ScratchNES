/**
 * inputs the sRGB palette;
 * emits the Scratch format lookup
 */

var fs = require("fs");
var palette = fs.readFileSync(process.argv[2])
                .toString()
                .split("\n")
                .map(function(str) {
                    var arr = [];
                    for(var i = 0; i < str.length; i += 13) {
                        arr.push(str.slice(i, i+13)
                                    .trim()
                                    .split(/[ ]+/)
                                    .map(function(x) {
                                        return x*1;
                                    }));
                    }
                    return arr.map(function(x) {
                        return (65536*x[0]) + (256*x[1]) + x[2];
                    });
                });

console.log([].concat.apply([], palette).join("\n"));
