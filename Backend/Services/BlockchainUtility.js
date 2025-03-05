import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { ABI } from '../constant.js';

dotenv.config();

export const ContractInteraction = () => {
    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_RPC_URL);
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const privateKey = process.env.PRIVATE_KEY;

    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, ABI, wallet);

    return contract;  
};
