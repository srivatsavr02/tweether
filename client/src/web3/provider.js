import Web3 from "web3";
import contract from "truffle-contract";

const provider = () => {
  // If the user has MetaMask:
  if (typeof Web3 !== "undefined") {
    return Web3.givenProvider;
  } else {
    console.error("You need to install MetaMask for this app to work!");
  }
};

export const eth = new Web3(provider()).eth;

export const getInstance = (artifact) => {
  const contractObj = contract(artifact);
  contractObj.setProvider(provider());

  return contractObj.deployed();
};
