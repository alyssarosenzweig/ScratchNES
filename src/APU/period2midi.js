/* period2midi.js
 * generates a table mapping NES periods into MIDI notes
 * internally, it's NES period -> frequency (Hz) -> MIDI note
 * a lookup table is madef as a result
 */

var fs = require("fs");

var results = [];
for(var i = 0; i < 2048; ++i) {
    results.push(mapping(i));
}

function mapping(period) {
    var frequency = CPU / (period + 1);
    var midi = 59 + (12*Math.log(frequency / 440)/Math.log(2));
    return midi;
}
