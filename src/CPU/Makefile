bin/reference.txt: build-reference.sh
	./build-reference.sh

bin/table.json: bin/reference.txt parse-reference.js
	node parse-reference.js bin/reference.txt

instructions/BCC:
	node branch-maker.js

instructions/CLC:
	node flag-maker.js

instructions/INC:
	node build-crement.js

clean:
	rm instructions/{BCC, BCS, BNE, BEQ, BVC, BVS, BPL, BMI}
	rm instructions/{CLC, SEC, CLD, SED, CLI, SEI, CLV}
	rm instructions/{INC, INX, INY, DEC, DEX, DEY}
	rm bin/*
