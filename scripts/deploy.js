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
   //2. Dice
   const Dice = await hre.ethers.getContractFactory("Dice");
   const dice = await Dice.deploy(randomizerRouter.address);

   await dice.deployed();

   console.log(`Dice game deployed to ${dice.address}`);
   //3. Limbo
   const Limbo = await hre.ethers.getContractFactory("Limbo");
   const limbo = await Limbo.deploy(randomizerRouter.address);

   await limbo.deployed();

   console.log(`Limbo game deployed to ${limbo.address}`);
   //4. Plinko
   const Plinko = await hre.ethers.getContractFactory("Plinko");
   const plinko = await CoinFlip.deploy(randomizerRouter.address);

   await plinko.deployed();

   console.log(`Plinko game deployed to ${plinko.address}`);
   //5. Range
   const Range = await hre.ethers.getContractFactory("Range");
   const range = await Range.deploy(randomizerRouter.address);

   await range.deployed();

   console.log(`Range game deployed to ${range.address}`);
   //6. RPS
   const RPS = await hre.ethers.getContractFactory("RPS");
   const rPS = await RPS.deploy(randomizerRouter.address);

   await rPS.deployed();

   console.log(`Coin Flip game deployed to ${rPS.address}`);
   //7. Moon - Multiplayer
   const Moon = await hre.ethers.getContractFactory("Moon");
   const moon = await Moon.deploy(randomizerRouter.address);

   await moon.deployed();

   console.log(`Moon game deployed to ${moon.address}`);

   //8. Wheel
   const Wheel = await hre.ethers.getContractFactory("Wheel");
   const wheel = await Wheel.deploy(randomizerRouter.address);

   await wheel.deployed();

   console.log(`Wheel game deployed to ${wheel.address}`);




}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
});