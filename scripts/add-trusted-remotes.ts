import { ethers, network } from "hardhat";

const config: {
  [key: number]: { collectionAddress: string; lzChainId: number };
} = {
  5: {
    collectionAddress: "0x040FCaa4A217719E8f8a31deb02e5E913025AD56",
    lzChainId: 10121,
  },
  280: {
    collectionAddress: "0x76429CC9d9cF0760f58B36Eb93b1C6178576E18B",
    lzChainId: 10165,
  },
  10200: {
    collectionAddress: "0x39befa007E3202AF37a842B6B5dc2E73f49Edf61",
    lzChainId: 10145,
  },
  43113: {
    collectionAddress: "0x39befa007E3202AF37a842B6B5dc2E73f49Edf61",
    lzChainId: 10106,
  },
  1442: {
    collectionAddress: "0x1d91F7ca78c514B46c4B8Fa957E853815B9F3430",
    lzChainId: 10158,
  },
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
