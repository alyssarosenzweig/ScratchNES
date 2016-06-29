#!/bin/sh
cd CPU ; node build-cpu.js > ../CPU.tosh ; cd ..
cat CPU.tosh PPU/PPU.tosh
