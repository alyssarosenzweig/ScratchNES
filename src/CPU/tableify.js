/*
 * automatically fills up a buffer with stuff from text
 */

console.log(require("fs").readFileSync(process.argv[2]).toString().split("\n").map(function(line) { return 'add "' + line + '" to ' + process.argv[3]; }).join("\n"));
