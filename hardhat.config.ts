import { HardhatUserConfig } from "hardhat/config";

// dev: for zkSync
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";

// dev: for everything else
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
const dotenv = require("dotenv");
dotenv.config();

const config: HardhatUserConfig = {
  zksolc: {
    version: "1.3.10",
    compilerSource: "binary",
    settings: {},
  },

  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ["local"],
    },
    hardhat: {
      live: false,
      saveDeployments: true,
      tags: ["test", "local"],
    },
    goerliEth: {
      live: true,
      url: "https://goerli.infura.io/v3/" + process.env.INFURA_KEY,
      saveDeployments: true,
      accounts: [process.env.PRIVATE_KEY || ""],
      tags: ["goerliEth"],
      chainId: 5,
    },
    okcTestnet: {
      live: true,
      url: "https://exchaintestrpc.okex.org",
      saveDeployments: true,
      accounts: [process.env.PRIVATE_KEY || ""],
      tags: ["okcTestnet"],
      chainId: 65,
    },
    gnosisTestnet: {
      live: true,
      url: "https://rpc.chiadochain.net",
      saveDeployments: true,
      accounts: [process.env.PRIVATE_KEY || ""],
      tags: ["okcTestnet"],
      chainId: 10200,
    },
    fuseTestnet: {
      live: true,
      url: "https://rpc.fuse.io",
      saveDeployments: true,
      accounts: [process.env.PRIVATE_KEY || ""],
      tags: ["fuseTestnet"],
      chainId: 122,
    },
    tenetTestnet: {
      live: true,
      url: "https://rpc.fuse.io",
      saveDeployments: true,
      accounts: [process.env.PRIVATE_KEY || ""],
      tags: ["tenetTestnet"],
      chainId: 155,
    },
    klaytnTestnet: {
      live: true,
      url: "https://public-node-api.klaytnapi.com/v1/baobab",
      saveDeployments: true,
      accounts: [process.env.PRIVATE_KEY || ""],
      tags: ["klaytnTestnet"],
      chainId: 1001,
    },
    avalancheTestnet: {
      live: true,
      url: "https://avalanche-fuji-c-chain.publicnode.com",
      saveDeployments: true,
      accounts: [process.env.PRIVATE_KEY || ""],
      tags: ["avalancheTestnet"],
      chainId: 43113,
    },
    moonbeamTestnet: {
      live: true,
      url: "https://rpc.api.moonbase.moonbeam.network",
      saveDeployments: true,
      accounts: [process.env.PRIVATE_KEY || ""],
      tags: ["moonbeamTestnet"],
      chainId: 1287,
    },
    arbitrumTestnet: {
      live: true,
      url: "https://arbitrum-goerli.publicnode.com",
      saveDeployments: true,
      accounts: [process.env.PRIVATE_KEY || ""],
      tags: ["arbitrumTestnet"],
      chainId: 421613,
    },
    zkSyncTestnet: {
      live: true,
      url: "https://testnet.era.zksync.dev",
      saveDeployments: true,
      accounts: [process.env.PRIVATE_KEY || ""],
      tags: ["zkSyncTestnet"],
      ethNetwork: "goerliEth",
      chainId: 280,
      zksync: true,
    },
    polygonZkSyncTestnet: {
      live: true,
      url: "https://rpc.public.zkevm-test.net",
      saveDeployments: true,
      accounts: [process.env.PRIVATE_KEY || ""],
      tags: ["polygonZkSyncTestnet"],
      chainId: 1442,
    },
  },
  namedAccounts: {
    deployer: 0,
    endpoint: {
      default: 0,
      5: "0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23",
      43113: "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
      421613: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
      1287: "0xb23b28012ee92E8dE39DEb57Af31722223034747",
      1001: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
      10200: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
      280: "0x093D2CF57f764f09C3c2Ac58a42A2601B8C79281",
      65: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
      1442: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
      155: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
    },
  },
};

export default config;
