import { ethers } from "ethers";

interface Revision {
    title: string;
    body: string;
    createdAt: ethers.BigNumber;
}

export default Revision;
