# Abstract Myself

Protect your bytes, texts, passwords, contents, your mom, fairies, and everything that you might need another safety layer...

The reason behind this project is to keep my personal and family assets safe. This script allows you to protect your assets in the blockchain without ever having to expose the raw private keys to dApps and institutions.

I myself, am currently at Stake in most L1s and won't move my assets for the next 2 years. It is way safer than actually relying on DEX, ledgers, or papers spread around the house. This method allows me to freely publish the AES hash anywhere publicly on the web, being the only one that knows the decryption password.

## Content

You should learn and practice the script before actually using it. It counts on two simple and easy to use functions:

- Encode
- Decode

## Instalation

### Node JS

First it is required that you install `node.js` in your machine. You can start by following this link: [NodeJS](https://nodejs.org/en/download)

### Modules

Both package managers work fine. I'm personally using `yarn`. Which can be installed by running:

```shell
npm i -g yarn
```

Then you can install the dependencies and run the code by running:

```shell
yarn
```

### Preparing Files

First check the example at `./keys/keys.json.example`.
Any content inside the file will be encoded and decoded eventually. The format only matters for whats inside the json.

1. Fill the keys.json file or adapt it as you wish.
2. Fill .env file with the passwords.

## Running Scripts

The following scripts are ready to use. Just follow the file prepartion step and you are good to go.

### Encode

Will combine all passwords with Solidity's abi.encodePacked, then run keccak256(sha3), and call `computePublicKey` to generate a 132 length password. It reads from the `keys.json` file at the keys folders.

```shell
yarn encode
```

A file will be created named `encoded_output.json` in the root folder of the project.

### Decode

Will repeat the same process to generate the password, but will consume the hash at `encoded_output.json` to decode rather than encoding again.

```shell
yarn decode
```

A file will be created named `decoded_output.json` in the root folder of the project.

If anything wen't wrong, I bet you will get a nice error or at least a lot of scrambled contents after decoding. But if you used strings for everything and the JSON format is normal, then everything should work fine :D

## Attention

You should be careful not to mess the original file or to scramble the files by accident. Always follow up any changes in the repository prior to encode/decode and never forget to check `.gitignore` and `.env` integrity.

I recommend keeping the orignal at the `keys` folder and working the encoded and decoded output files in the root of the project

## Next

I'm non stopping machine, let's build!!

- Create private keys using regular passwords (why not?).

- I'll create a minimalistic Account Abstraction Contract, to allow my cold wallets to


## Utils
```
import { ethers } from "hardhat";

export function encodePacked(
	arg1: any,
	arg2: any,
	arg3: any,
	arg4: any,
	arg5: any
) {
	return ethers.utils.solidityPack(
		["string", "string", "string", "string", "string"],
		[arg1, arg2, arg3, arg4, arg5]
	);
}

export function keccak256(arg: any) {
	return ethers.utils.keccak256(arg);
}

export function computePublicKey(arg: any) {
	return ethers.utils.computePublicKey(arg);
}
```
## Encode Script
```
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
```
## Decode Script
```
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
```

## PACKAGE
```
{
	"scripts": {
		"encode": "npx hardhat run scripts/encode.ts",
		"decode": "npx hardhat run scripts/decode.ts"
	},
	"devDependencies": {
		"@nomicfoundation/hardhat-chai-matchers": "^1.0.0",
		"@nomicfoundation/hardhat-network-helpers": "^1.0.8",
		"@nomicfoundation/hardhat-toolbox": "^2.0.1",
		"@nomiclabs/hardhat-ethers": "^2.2.2",
		"@nomiclabs/hardhat-etherscan": "^3.1.5",
		"@nomiclabs/hardhat-solhint": "^3.0.0",
		"@nomiclabs/hardhat-truffle5": "^2.0.7",
		"@nomiclabs/hardhat-waffle": "^2.0.1",
		"@nomiclabs/hardhat-web3": "^2.0.0",
		"@openzeppelin/contracts": "^4.8.1",
		"@openzeppelin/test-helpers": "^0.5.16",
		"@typechain/ethers-v5": "^10.2.0",
		"@typechain/hardhat": "^6.1.5",
		"@types/crypto-js": "^4.1.1",
		"@types/mocha": "^10.0.1",
		"chai": "^4.3.4",
		"crypto-js": "^4.1.1",
		"dotenv": "^16.0.3",
		"ethereum-waffle": "^3.3.0",
		"ethers": "^5.6.1",
		"hardhat": "^2.12.7",
		"hardhat-gas-reporter": "^1.0.9",
		"js-sha3": "^0.8.0",
		"solidity-coverage": "^0.8.2",
		"ts-node": "^10.9.1",
		"typechain": "^8.1.1",
		"typescript": "^4.9.5",
		"web3": "^1.8.2"
	}
}
```

## Example of keys.json

```
[
	{
		"type": "",
		"name": "",
		"public": "",
		"private": "",
		"seed": ""
	},
    {
		"type": "",
		"name": "",
		"public": "",
		"private": "",
		"seed": ""
	}
]
```