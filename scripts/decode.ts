/// Save and read files
import * as fs from "fs";

/// Import crypto-js for AES encryption and decryption
import CryptoJS from "crypto-js";

/// Import ethers utils for keccak256 and encodePacked
import { encodePacked, keccak256, computePublicKey } from "../scripts/utils";

/// Import environment variables
import dotenv from "dotenv";
dotenv.config();

/// Import the encoded content
import encoded from "../encoded_output.json";

/// Import the password from the environment variables
const { PASSWORD1, PASSWORD2, PASSWORD3, PASSWORD4, PASSWORD5 } = process.env;

function main() {
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

	// We decrypt the keys using the hash content and hashed password
	const keys_decoded = CryptoJS.AES.decrypt(encoded.hash, public_key).toString(
		CryptoJS.enc.Utf8
	);

	// Convert the data to a JSON object
	const parseString = JSON.parse(keys_decoded);

	// Convert the data to a JSON string
	// For some reason this must be done when returned from the AES
	const jsonString = JSON.stringify(parseString, null, 4);

	// Write the JSON string to a file
	fs.writeFileSync("decoded_output.json", jsonString);
}

main();
