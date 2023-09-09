
const hre = require("hardhat");

async function sleep(ms){
  return new Promise((resolve)=>setTimeout(resolve, ms));
}

async function main() {

 const whitelistContract = await ethers.deployContract("Whitelist", [10]);

await whitelistContract.waitForDeployment();

console.log(" Whitelist contract address: ", whitelistContract.target);

await sleep(30 * 1000) // sleep for 30 seconds while etherscan indexes the new contract

await run("verify:verify",{
  address: whitelistContract.target,
  constructorArguments: [10],

}); 

}



main()
.then(()=>process.exit(0))
.catch((error)=>{
  console.error(error);
  process.exit(1);
});
