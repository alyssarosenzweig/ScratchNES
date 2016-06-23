bin/reference.txt: build-reference.sh
	./build-reference.sh

bin/table.json: bin/reference.txt parse-reference.js
	node parse-reference.js bin/reference.txt

bin/EOR.txt:
	node build-lookups.js

instructions/BCC:
	node branch-maker.js

instructions/CLC:
	node flag-maker.js

instructions/INC:
	node build-crement.js

instructions/TAX:
	node build-transfer.js

instructions/EOR:
	node build_bitwise.js

clean:
	-cd instructions ; rm BCC BCS BNE BEQ BVC BVS BPL BMI
	-cd instructions ; rm CLC SEC CLD SED CLI SEI CLV
	-cd instructions ; rm INC INX INY DEC DEX DEY
	-cd instructions ; rm TAX TAY TSX TXA TXS TYA
	-cd instructions ; rm AND EOR ORA
