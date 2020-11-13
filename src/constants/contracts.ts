import Blog from "@web3md/contracts/deployments/kovan/Blog.json";
import { ethers } from "ethers";

export const getBlog = (signer: ethers.Signer) => {
    return ethers.ContractFactory.getContract(Blog.address, Blog.abi, signer);
};
