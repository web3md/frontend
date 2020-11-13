import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { ethers } from "ethers";
import { getBlog } from "../constants/contracts";

const useBlog = () => {
    const history = useHistory();
    const [creatingPost, setCreatingPost] = useState(false);
    const createPost = async (title: string, body: string, signer?: ethers.Signer) => {
        if (title && body && signer) {
            setCreatingPost(true);
            try {
                const blog = getBlog(signer);
                const tx = await blog.create(title, body, ethers.constants.HashZero);
                const receipt = await tx.wait();
                const hash = receipt.events[0].args.hash;
                history.push("/post/" + hash);
            } finally {
                setCreatingPost(false);
            }
        }
    };
    const fetchPost = useCallback(async (hash: string, provider?: ethers.providers.Provider) => {
        if (hash && provider) {
            const blog = getBlog(provider);
            return blog.getPost(hash);
        }
    }, []);
    return { creatingPost, createPost, fetchPost };
};

export default useBlog;
