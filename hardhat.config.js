require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const SHARDEUM_RPC = process.env.SHARDEUM_RPC;
const privateKey = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
      shardeum: {
      url: SHARDEUM_RPC,
      accounts: [privateKey],
      chainId: 8119,
    }
  },
}; 