const { ethers } = require("hardhat")

async function main() {
  const hre = require("hardhat")
  const network = hre.network
  console.log("Deploying NFT Access Passport contract...")

  const NFTAccessPassport = await ethers.getContractFactory("NFTAccessPassport")
  const contract = await NFTAccessPassport.deploy()

  await contract.deployed()

  console.log("NFT Access Passport deployed to:", contract.address)
  console.log("Transaction hash:", contract.deployTransaction.hash)

  // Verify contract on Polygonscan (optional)
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Waiting for block confirmations...")
    await contract.deployTransaction.wait(6)

    try {
      await hre.run("verify:verify", {
        address: contract.address,
        constructorArguments: [],
      })
    } catch (error) {
      console.log("Verification failed:", error.message)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
