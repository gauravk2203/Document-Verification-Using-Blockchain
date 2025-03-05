import ipfsOnlyHash from "ipfs-only-hash";

/**
 * Generates an IPFS-compatible CIDv0 hash for a given file buffer.
 * @param {Buffer} fileBuffer - The file content as a buffer.
 * @returns {Promise<string>} - The IPFS hash (CIDv0).
 */
export async function generateIPFSHash(fileBuffer) {
    try {
        // Generate IPFS hash (CIDv0) using ipfs-only-hash
        const cidV0 = await ipfsOnlyHash.of(fileBuffer, { cidVersion: 0 });
        return cidV0;
    } catch (error) {
        console.error("Error generating IPFS hash:", error.message);
        throw error;
    }
}

