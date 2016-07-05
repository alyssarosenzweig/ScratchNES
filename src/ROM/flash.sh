#!/bin/sh
./hexify $1 > $1.hex
node ../tools/tablify.js $1.hex "iNES ROM"
