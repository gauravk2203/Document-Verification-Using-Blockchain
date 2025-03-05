require('dotenv').config();  // Load environment variables
const { byteCode, abi } = require('../constant.js');
const ethers = require('ethers');

async function main() {
    // Connect to Ethereum Sepolia testnet
    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_RPC_URL);

    // Load wallet securely from .env file
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // Create a contract factory
    const factory = new ethers.ContractFactory(abi, byteCode, wallet);

    // Deploy the contract
    const contract = await factory.deploy();
    await contract.waitForDeployment();  // Wait until deployment is confirmed

    console.log("✅ Contract deployed at:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });