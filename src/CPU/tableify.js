/*
 * automatically fills up a buffer with stuff from text
 */

var arr = require("fs").readFileSync(process.argv[2])
            .toString()
             .split("\n")
             .map(function(line) {
                 return 'add "' + line + '" to ' + process.argv[3];
             });

console.log("when this sprite clicked");
console.log("delete all of " + process.argv[3]);
console.log(arr.join("\n"));
