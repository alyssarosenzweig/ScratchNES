/* rip.js
 * rips an NROM-32 .nes file
 */

var fs = require("fs");
var name = process.argv[2].split(".").slice(0, -1).join(".");
var game = fs.readFileSync(process.argv[2]);
var PRGROM = game.slice(16, 16 + 16384);
fs.writeFileSync(name + ".hex", PRGROM);
