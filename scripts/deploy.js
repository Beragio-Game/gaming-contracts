const hre = require("hardhat");

//Contracts to deploy:
//1. Vault Manager
//2. Coin Flip - Game
//4. VRF provider
//5. Router
//6. Vault Mechanism 
//7. Mint Burn Logic to play game with own token. 

async function main() {

   //Vault Manager Contract 

   const VaultManager = await hre.ethers.getContractFactory("VaultManager");
   const vaultManager = await VaultManager.deploy();

   await vaultManager.deployed();

   console.log(`Vault Manager deployed to ${vaultManager.address}`);

   //Randomizer Router Contract 
   const RandomizerRouter = await hre.ethers.getContractFactory("RandomizerRouter");
   const randomizerRouter = await RandomizerRouter.deploy();

   await randomizerRouter.deployed();

   console.log(`Randomizer Router deployed to ${randomizerRouter.address}`);



   //Random Number Provider Contract
   //PythProvider
   const PythProvider = await hre.ethers.getContractFactory("PythProvider");
   //Need to provide the entropy address and a construftor argument. 
   const pythProvider = await PythProvider.deploy('0xE129236aAf50E8890a3eaad082FF37232bAB37b2');

   await pythProvider.deployed();

   console.log(`Pyth Provider deployed to ${pythProvider.address}`);


   //Single Player Games Contract:
   //1. Coin Flip:
   const CoinFlip = await hre.ethers.getContractFactory("CoinFlip");
   const coinFlip = await CoinFlip.deploy(randomizerRouter.address);

   await coinFlip.deployed();

   console.log(`Coin Flip game deployed to ${coinFlip.address}`);



}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
});