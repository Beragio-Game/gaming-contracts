import { HardhatUserConfig } from "hardhat/config";

import "hardhat-deploy";
// To make hardhat-waffle compatible with hardhat-deploy
// we have aliased hardhat-ethers to hardhat-ethers-deploy in package.json
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "@typechain/hardhat";
import "solidity-coverage";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x21509d66752f8a9f01333d0002cecfb6d915a5a0be5cd54fb095b7b31321f518";

const hardhatConfig: HardhatUserConfig = {
  defaultNetwork: "berachain",
  namedAccounts: {
    deployer: 0, // Do not use this account for testing
    admin: 1,
},
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  networks: {
    hardhat: {},
    berachain: { 
      url: `https://artio.rpc.berachain.com/`,  
      accounts: [PRIVATE_KEY]
   },
    coverage: {
      url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    },
  },
  // gasReporter: {
  //   currency: 'USDT',
  //   coinmarketcap: process.env.COINMARKETCAP_API,
  // },
};

export default hardhatConfig;