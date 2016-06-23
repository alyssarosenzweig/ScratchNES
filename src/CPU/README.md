# CPU Architecture

The CPU code was automatically generated from the scripts in this directory and the 6502 instruction set reference hosted by e-tradition.

# Instruction set

Each possible instruction is stored in a file in instructions/. The first line of the file is a comma-separated list of options. The rest of the file is tosh source code for that instruction in the general case.

## Options

* R
Dereference the address into OP.

* RW
Load the address into OP before the code runs. After the code runs, copy it back.

* IMPLIED
Don't do anything. I needed to save a line, k?

* RAW
Load the effective address into OP, but do not dereference it.

* N, Z
Automatically update the respective flag in the typical way.
