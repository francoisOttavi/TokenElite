require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  solidity: "0.8.18",
  etherscan : {
    apiKey : "UNQ1YUQ7TEDP8DPFRHZPRCACQU84ZMZZ5N"

  },

  paths: {
    artifacts:'./src/artifacts'
  },

  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/5782ff3106904112b8357f4bca0d8239",
      accounts: ['0x9e8c060989d391dece9d34f98871e333bff620e55deea58da49afcc982374d23']
    },
  }

};
