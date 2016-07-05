#!/bin/sh
./hexify.sh $1 > $1.hex
node ../tools/tableify.js $1.hex "iNES ROM"
