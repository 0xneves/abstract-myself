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

Both package managers work fine. I'm personally using `yarn`.

```shell
yarn
npm i
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
