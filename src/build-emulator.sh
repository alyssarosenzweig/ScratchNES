#!/bin/sh
node CPU/build-cpu.js > CPU.tosh
cat bin/CPU.tosh PPU/PPU.tosh
