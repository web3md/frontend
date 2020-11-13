import Blog from "@web3md/contracts/deployments/kovan/Blog.json";
import { ethers } from "ethers";

export const getBlog = (signerOrProvider: ethers.Signer | ethers.providers.Provider) => {
    return new ethers.Contract(Blog.address, Blog.abi, signerOrProvider);
};
