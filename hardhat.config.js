require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// // This is a sample Hardhat task. To learn how to create your own go to
// // https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    mumbai: {
      url: process.env.MUMBAI_URL_PRIVATE_KEY,
      accounts: [process.env.MUMBAI_ACCOUNT_PRIVATE_KEY],
    },
  },
};
