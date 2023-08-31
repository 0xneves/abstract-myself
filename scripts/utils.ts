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
