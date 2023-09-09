
const hre = require("hardhat");

const contractAddress = "0xaB30c7A7BF1Ff5007e09626d91E94DD7605b7D1A";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {

  const nftContract = await hre.ethers.deployContract("CryptoDevs", [contractAddress]);

  await nftContract.waitForDeployment();

  
  console.log("NFT Contract Address:", nftContract.target);

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds

  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: [contractAddress],
  });
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });