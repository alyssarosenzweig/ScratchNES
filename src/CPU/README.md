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

# Internal format

Memory is stored as 8-bit unprefixed hex values (e.g.: "FF"). The SR register is implied and broken up into 8 seperate boolean registers. The remaining registers are decimal.

Please take caution with lookup tables -- they're one-indexed not zero!

Mapper read/write take addresses in decimal to save on conversion in addressing modes.
