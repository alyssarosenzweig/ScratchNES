#!/bin/sh
cd CPU ; node build-cpu.js > ../CPU.tosh ; cd ..
cat CPU.tosh
echo ""
cat PPU/PPU.tosh
