// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const factory  = await hre.ethers.getContractFactory("Webify");
  const receiverAddress = "0xb590067B4d0BC4302ae4EbA4F26b9898Fa7BBe7a";
  const contract = await factory.deploy(receiverAddress);
  await contract.deployed();

  console.log(`webify deployed to ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
