/* period2midi.js
 * generates a table mapping NES periods into MIDI notes
 * internally, it's NES period -> frequency (Hz) -> MIDI note
 * a lookup table is madef as a result
 */

var fs = require("fs");

var results = [];

// intentional off-by-one error;
// the idea here is to prevent Scratch from needing to add 1,
// which is OK because nobody's going to really play period 0;
// as a matter of fact, on the real NES periods 0-7 are silent

for(var i = 1; i < 2048; ++i) {
    results.push(mapping(i));
}

console.log(results.join("\n"));

/* NTSC CPU clock rate */
var Hz = 1;
var kHz = 1000 * Hz;
var MHz = kHz * kHz;
var CPU = 1.789773 * MHz;

function mapping(period) {
    var frequency = CPU / ((16*period) + 1);
    var midi = 59 + (12*Math.log(frequency / 440)/Math.log(2));
    return midi;
}
