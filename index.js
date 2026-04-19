/*
https://url.spec.whatwg.org/#percent-encoded-bytes

To percent-decode a byte sequence input, run these steps:

	1. Let output be an empty byte sequence.
	2. For each byte byte in input:
		1. If byte is not 0x25 (%), then append byte to output.
		2. Otherwise, if byte is 0x25 (%) and the next two bytes after byte in
		   input are not in the ranges 0x30 (0) to 0x39 (9), 0x41 (A) to 0x46
		   (F), and 0x61 (a) to 0x66 (f), all inclusive, append byte to output.
		3. Otherwise:
			1. Let bytePoint be the two bytes after byte in input, decoded, and
			   then interpreted as hexadecimal number.
			2. Append a byte whose value is bytePoint to output.
			3. Skip the next two bytes in input.
	3. Return output.

To percent-decode a scalar value string input:

	1. Let bytes be the UTF-8 encoding of input.
	2. Return the percent-decoding of bytes.
*/

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const PERCENT = 37;

const codeToValue = {
	48: 0, 49: 1, 50: 2, 51: 3, 52: 4, 53: 5, 54: 6, 55: 7, 56: 8, 57: 9,
	65: 10, 66: 11, 67: 12, 68: 13, 69: 14, 70: 15,
	97: 10, 98: 11, 99: 12, 100: 13, 101: 14, 102: 15
};

function hexInvalid(code) {
	return codeToValue[code] === undefined;
}

function hexPair(high, low) {
	return (codeToValue[high] << 4) + codeToValue[low];
}

function percentDecode(input) {
	const bytes = encoder.encode(input);
	const output = [];

	for (let i = 0; i < bytes.length; i += 1) {
		if (
			bytes[i] !== PERCENT
			|| bytes.length < i + 2
			|| hexInvalid(bytes[i + 1])
			|| hexInvalid(bytes[i + 2])
		) {
			output.push(bytes[i]);
		} else {
			output.push(hexPair(bytes[i + 1], bytes[i + 2]));
			i += 2;
		}
	}

	return decoder.decode(new Uint8Array(output));
}

module.exports = percentDecode;
