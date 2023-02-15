// imports
import {ethers, run, network} from "hardhat"

//async main
async function main(){
  const SimpleStorageFactory = await ethers.getContractFactory(
    "SimpleStorage"
    )
    console.log(`Deploying contract to: ${process.env.GOERLI_RPC_URL}`)
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed contract to: ${simpleStorage.address}`)
    //Verify contract if we're on a testnet
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
      console.log("Waiting for blocks txes...")
      await simpleStorage.deployTransaction.wait(6)
      await verify(simpleStorage.address, [])
    }

    //Get and Update the current value.
    const currentValue =  await simpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
}

//Verify contract function
async function verify(contractAddress: string, args: any[]){
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    }
  }
}

//call main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
})