import { ethers } from "ethers";
import Revision from "./Revision";

interface Post {
    author: string;
    parentHash: string;
    title: string;
    body: string;
    updatedAt: ethers.BigNumber;
    revisions?: Revision[];
}

export default Post;
