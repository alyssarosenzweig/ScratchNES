#!/bin/sh
cat CPU/common.tosh
echo ""
cd CPU ; node build-cpu.js > ../CPU.tosh ; cd ..
cat CPU.tosh
echo ""
cat PPU/PPU.tosh
echo ""
echo ""
cat Input/input.tosh
echo ""
cat ROM/ROM.tosh
