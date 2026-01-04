const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

// -------------------- Helpers --------------------

async function waitForTransactionWithRetries(
  provider,
  txHash,
  maxRetries = 10,
  delay = 10000
) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`⏳ [${i + 1}/${maxRetries}] Waiting for tx: ${txHash}`);
      const receipt = await provider.getTransactionReceipt(txHash);

      if (receipt) {
        console.log(`   ✅ Confirmed in block ${receipt.blockNumber}`);
        return receipt;
      }

      await new Promise(r => setTimeout(r, delay));
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error(`Tx ${txHash} not confirmed`);
}

async function deployContractRobust(factory, args, name) {
  console.log(`\n🚀 Deploying ${name}`);

  const contract = await factory.deploy(...args);
  const tx = contract.deploymentTransaction();

  console.log(`   ↳ Tx Hash: ${tx.hash}`);
  const receipt = await waitForTransactionWithRetries(
    contract.runner.provider,
    tx.hash
  );

  const address = await contract.getAddress();
  console.log(`   ✅ ${name} deployed at ${address}`);

  return { contract, address, receipt };
}

// -------------------- Main --------------------

async function main() {
  console.log("🌐 Network:", network.name);

  const [deployer] = await ethers.getSigners();
  console.log("👤 Deployer:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Balance:", ethers.formatEther(balance), "ETH");

  const deployments = {};

  try {
    // 1️⃣ OSSToken
    const OSSToken = await ethers.getContractFactory("OSSToken");
    const token = await deployContractRobust(OSSToken, [], "OSSToken");
    deployments.token = token;

    // 2️⃣ OSSRewardsV2
    const OSSRewardsV2 = await ethers.getContractFactory("OSSRewardsV2");
    const rewards = await deployContractRobust(
      OSSRewardsV2,
      [token.address],
      "OSSRewardsV2"
    );
    deployments.rewardsV2 = rewards;

    // 3️⃣ OSSDAO
    const OSSDAO = await ethers.getContractFactory("OSSDAO");
    const dao = await deployContractRobust(
      OSSDAO,
      [token.address],
      "OSSDAO"
    );
    deployments.dao = dao;

    // -------------------- Roles --------------------

    console.log("\n🔧 Configuring roles...");

    console.log("➕ Grant MINTER_ROLE → OSSRewardsV2");
    const minterTx = await token.contract.addMinter(rewards.address);
    await waitForTransactionWithRetries(deployer.provider, minterTx.hash);

    // OPTIONAL BUT STRONGLY RECOMMENDED
    console.log("➕ Grant ADMIN / GOVERNANCE → OSSDAO");
    const adminTx = await token.contract.transferOwnership(dao.address);
    await waitForTransactionWithRetries(deployer.provider, adminTx.hash);

    console.log("✅ Roles configured");

    // -------------------- Save Deployment --------------------

    const deploymentInfo = {
      network: network.name,
      chainId: network.config.chainId,
      deployer: deployer.address,
      timestamp: new Date().toISOString(),
      contracts: {
        OSSToken: token.address,
        OSSRewardsV2: rewards.address,
        OSSDAO: dao.address
      }
    };

    const deploymentsDir = path.join(__dirname, "..", "deployments");
    fs.mkdirSync(deploymentsDir, { recursive: true });

    const file = path.join(deploymentsDir, `${network.name}.json`);
    fs.writeFileSync(file, JSON.stringify(deploymentInfo, null, 2));
    console.log("📄 Deployment saved →", file);

    // -------------------- Frontend Sync --------------------

    const frontendPath = path.join(
      __dirname,
      "..",
      "src",
      "utils",
      "contracts.js"
    );

    fs.writeFileSync(
      frontendPath,
      `// Auto-generated — DO NOT EDIT

export const CONTRACT_ADDRESSES = {
  TOKEN: "${token.address}",
  REWARDS_V2: "${rewards.address}",
  DAO: "${dao.address}",
};

export const NETWORK = {
  name: "${network.name}",
  chainId: ${network.config.chainId},
};
`
    );

    console.log("🎨 Frontend updated");

    // -------------------- Summary --------------------

    console.log("\n📋 Deployment Summary");
    console.log("────────────────────────");
    console.log("🪙 Token      :", token.address);
    console.log("🎁 RewardsV2  :", rewards.address);
    console.log("🏛️ DAO        :", dao.address);
    console.log("────────────────────────");

    console.log("\n✅ Deployment complete");

  } catch (err) {
    console.error("\n❌ Deployment failed:", err.message);
    process.exit(1);
  }
}

main();
