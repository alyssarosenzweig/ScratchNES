#!/bin/sh
node CPU/build-cpu.js > bin/CPU.tosh
cat bin/CPU.tosh PPU/PPU.tosh
