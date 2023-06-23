import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { Wallet } from "zksync-web3";
import { utils } from "ethers";

import dotenv from "dotenv";
dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { endpoint } = await getNamedAccounts();

  if (network.name === "zkSyncTestnet") {
    // Initialize the wallet.
    const wallet = new Wallet(PRIVATE_KEY);

    // Create deployer object and load the artifact of the contract you want to deploy.
    const deployer = new Deployer(hre, wallet);
    const artifact = await deployer.loadArtifact("ToolflyCollection");

    const deploymentFee = await deployer.estimateDeployFee(artifact, [
      endpoint,
    ]);
    const parsedFee = utils.formatEther(deploymentFee.toString());
    console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

    const collectionContract = await deployer.deploy(artifact, [endpoint]);

    console.log(
      "constructor args:" +
        collectionContract.interface.encodeDeploy([endpoint])
    );

    // Show the contract info.
    const contractAddress = collectionContract.address;
    console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
    return;
  }
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("deployer", deployer);
  console.log("endpoint", endpoint);

  await deploy("ToolflyCollection", {
    from: deployer,
    args: [endpoint],
    log: true,
  });
};
export default func;
func.tags = ["Token"];
