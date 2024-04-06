import dotenv from 'dotenv';
import { ethers } from 'ethers';

dotenv.config();

export const BUNDLER_PK = process.env.LOCAL ==="true"? process.env.LOCAL_BUNDLER_PRIVATE_KEY: process.env.BUNDLER_PRIVATE_KEY; 
export const RPC_URL = process.env.LOCAL === "true"? process.env.LOCAL_RPC_URL: process.env.RPC_URL;
export const PROVIDER = new ethers.providers.StaticJsonRpcProvider(RPC_URL);
export const SIGNER = new ethers.Wallet(BUNDLER_PK, PROVIDER);
