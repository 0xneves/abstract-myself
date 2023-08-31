/// Save and read files
import * as fs from "fs";

/// Import crypto-js for AES encryption and decryption
import CryptoJS from "crypto-js";

/// Import ethers utils for keccak256 and encodePacked
import { encodePacked, keccak256, computePublicKey } from "../scripts/utils";

/// Import environment variables
import dotenv from "dotenv";
dotenv.config();

/// Import the raw keys assigned in the json file
import keys from "../keys/keys.json";

/// Import the password from the environment variables
const { PASSWORD1, PASSWORD2, PASSWORD3, PASSWORD4, PASSWORD5 } = process.env;

function main() {
	// Convert the keys to a single string
	const key_string = JSON.stringify(keys);

	// The encode is predefined for 5 arguments
	// @dev Can be expanded and adapted as needed
	const encode_pass = encodePacked(
		PASSWORD1,
		PASSWORD2,
		PASSWORD3,
		PASSWORD4,
		PASSWORD5
	);

	// We hash the encoded password using sha3 (keccak256)
	const hashed_pass = keccak256(encode_pass);

	// We compute the public key from the hashed password
	// I highly recommend you do not ever use this key for anything but for this
	const public_key = computePublicKey(hashed_pass);

	// We encrypt the keys using the public key and AES encryption
	const cipher_text = CryptoJS.AES.encrypt(key_string, public_key).toString();

	// We print the ciphertext to the console
	console.log(cipher_text);

	// Create a JSON object
	const json = {
		hash: cipher_text,
	};

	// Convert the data to a JSON string
	const json_string = JSON.stringify(json, null, 2);

	// Write the JSON string to a file
	fs.writeFileSync("encoded_output.json", json_string);
}

main();
