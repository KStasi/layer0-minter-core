import { ethers, network } from "hardhat";

const config: {
  [key: number]: { collectionAddress: string; lzChainId: number };
} = {
  8217: { collectionAddress: '0xFCB53a6B289923bF9b1BF6A080141081B95Af796', lzChainId: 150 },
  43114: { collectionAddress: '0xFCB53a6B289923bF9b1BF6A080141081B95Af796', lzChainId: 106 },
  122: { collectionAddress: '0xFCB53a6B289923bF9b1BF6A080141081B95Af796', lzChainId: 138 },
  1284: { collectionAddress: '0xFCB53a6B289923bF9b1BF6A080141081B95Af796', lzChainId: 126 },
  66: { collectionAddress: '0xFCB53a6B289923bF9b1BF6A080141081B95Af796', lzChainId: 155 }
};

async function main() {
  const chainId = network.config.chainId;

  if (!chainId || !config[chainId]) {
    throw new Error("ChainId not supported");
  }
  const collectionAddress = config[chainId].collectionAddress;
  const Collection = await ethers.getContractAt(
    "ToolflyCollection",
    collectionAddress
  );
  const trustedRemoteAddresses = Object.values(config)
    .filter((c) => c.lzChainId !== config[chainId].lzChainId)
    .map((c) => c.collectionAddress);
  const trustedRemoteChainIds = Object.values(config)
    .map((c) => c.lzChainId)
    .filter((c) => c !== config[chainId].lzChainId);

  await Collection.setTrustedRemoteAddresses(
    trustedRemoteChainIds,
    trustedRemoteAddresses
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
