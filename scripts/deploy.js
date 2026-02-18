const hre = require("hardhat");

async function main() {
    console.log("Deploying SoundDAO contracts...");

    // Deploy SoundCoin
    console.log("Deploying SoundCoin...");
    const SoundCoin = await hre.ethers.getContractFactory("SoundCoin");
    const soundCoin = await SoundCoin.deploy(hre.ethers.utils.parseEther("1000000"));
    await soundCoin.deployed();
    console.log("SoundCoin deployed to:", soundCoin.address);

    // Deploy GameMechanics
    console.log("Deploying GameMechanics...");
    const GameMechanics = await hre.ethers.getContractFactory("GameMechanics");
    const gameMechanics = await GameMechanics.deploy();
    await gameMechanics.deployed();
    console.log("GameMechanics deployed to:", gameMechanics.address);

    // Deploy SoundMarketplace
    console.log("Deploying SoundMarketplace...");
    const SoundMarketplace = await hre.ethers.getContractFactory("SoundMarketplace");
    const soundMarketplace = await SoundMarketplace.deploy();
    await soundMarketplace.deployed();
    console.log("SoundMarketplace deployed to:", soundMarketplace.address);

    // Deploy CreatorSupport
    console.log("Deploying CreatorSupport...");
    const CreatorSupport = await hre.ethers.getContractFactory("CreatorSupport");
    const creatorSupport = await CreatorSupport.deploy(soundCoin.address);
    await creatorSupport.deployed();
    console.log("CreatorSupport deployed to:", creatorSupport.address);

    console.log("\n=== Deployment Summary ===");
    console.log("SoundCoin:", soundCoin.address);
    console.log("GameMechanics:", gameMechanics.address);
    console.log("SoundMarketplace:", soundMarketplace.address);
    console.log("CreatorSupport:", creatorSupport.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });