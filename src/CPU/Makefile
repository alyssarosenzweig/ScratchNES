bin/reference.txt: build-reference.sh
	./build-reference.sh

bin/table.json: bin/reference.txt parse-reference.js
	node parse-reference.js bin/reference.txt

clean:
	rm instructions/{BCC, BCS, BNE, BEQ, BVC, BVS, BPL, BMI}
