import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
const dotenv = require("dotenv");
dotenv.config();

const config: HardhatUserConfig = {
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
  },
  namedAccounts: {
    deployer: 0,
    endpoint: {
      // default: 0,
      // TODO: fix chainId
      5: "0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23",
      10102: "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1",
      10106: "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
      10108:
        "0x1759cc0d3161f1eb79f65847d4feb9d1f74fb79014698a23b16b28b9cd4c37e3",
      10109: "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8",
      10112: "0x7dcAD72640F835B0FA36EFD3D6d3ec902C7E5acf",
      10143: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
      10132: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
      10133: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
      10126: "0xb23b28012ee92E8dE39DEb57Af31722223034747",
      10125: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
      10118: "0x6C7Ab2202C98C4227C5c46f1417D81144DA716Ff",
      10128: "0xd682ECF100f6F4284138AA925348633B0611Ae21",
      10150: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
      10151: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
      10153: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
      10145: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
      10165: "0x093D2CF57f764f09C3c2Ac58a42A2601B8C79281",
      10155: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
      10160: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
      10156: "0x3De2f3D1Ac59F18159ebCB422322Cb209BA96aAD",
      10157: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
      10162: "0x45841dd1ca50265Da7614fC43A361e526c0e6160",
      10161: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
      10158: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
      10175: "0x8b14D287B4150Ff22Ac73DF8BE720e933f659abc",
      10170: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
      10173: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
      10159: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
      10172: "0x8b14D287B4150Ff22Ac73DF8BE720e933f659abc",
      10174: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
    },
  },
};

export default config;
