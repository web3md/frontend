import { ethers } from "ethers";

interface Post {
    author: string;
    parentHash: string;
    title: string;
    body: string;
    updatedAt: ethers.BigNumber;
}

export default Post;
