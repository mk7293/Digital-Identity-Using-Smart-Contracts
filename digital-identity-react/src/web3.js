import Web3 from 'web3';

// Metamask injects older version web3 into the global window variable which has
// the provider that will connect to the Rinkeby network.
const web3 = new Web3(window.web3.currentProvider);


//To overwrite the older web3 version into the newer one.
export default web3;
