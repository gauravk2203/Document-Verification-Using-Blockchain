import { ContractInteraction } from "./BlockchainUtility.js";

const contract = ContractInteraction();

export const storeHashOnBlockchain = async (documentHash, studentUniqueId) => {
    try {
        // Send the transaction
        const tx = await contract.storeDocumentHash(documentHash, studentUniqueId);
        console.log('Transaction:', tx);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();  // Wait for confirmation (1 block)
        console.log('Transaction mined:', receipt);

        // Return transaction hash
        return tx.hash;
    } catch (error) {
        console.error('Error storing hash on blockchain:', error);
        throw new Error('Error storing hash on blockchain');
    }
};
