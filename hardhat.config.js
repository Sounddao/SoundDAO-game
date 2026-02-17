require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {},
    mainnet: {
      url: `https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
      accounts: [`0xYOUR_PRIVATE_KEY`], // replace with your wallet private key
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
      accounts: [`0xYOUR_PRIVATE_KEY`], // replace with your wallet private key
    },
  },
};