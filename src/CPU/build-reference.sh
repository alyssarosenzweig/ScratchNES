#!/bin/sh

# Original copy of tyhe instruction set
ORIGIN=http://e-tradition.net/bytes/6502/6502_instruction_set.html

# Fetch reference
wget $ORIGIN
mv 6502_instruction_set.html bin/reference.html

# trim out plain text -- first 200 lines 
tail -n +201 bin/reference.html | head -n 54 > bin/reference.txt
