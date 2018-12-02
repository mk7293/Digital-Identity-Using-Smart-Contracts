const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "clog chicken bar fix help that open sand sight major where lounge",
  "https://rinkeby.infura.io/v3/918d511d25e74aca8b853442ae292c73"
);

const web3 = new Web3(provider);

// we have made the fucntion because we cannot write async await outside the functions
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from accounts", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: "0x" + bytecode })
    .send({ gas: "3000000", from: accounts[0] });

  console.log(interface);
  console.log("Contract deployed to", result.options.address);
};

deploy();
