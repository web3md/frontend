import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { ethers } from "ethers";
import useAsyncEffect from "use-async-effect";
import { getBlog } from "../constants/contracts";
import { EthersContext } from "../context/EthersContext";
import Post from "../types/Post";

export interface PostState {
    reading: boolean;
    writing: boolean;
    setWriting: (writing: boolean) => void;
    post: Post | undefined;
    title: string;
    setTitle: (_title: string) => void;
    body: string;
    setBody: (_body: string) => void;
    create: () => Promise<void>;
    update: () => Promise<void>;
}

// tslint:disable-next-line:max-func-body-length
const usePostState = (hash?: string, revision?: string): PostState => {
    const history = useHistory();
    const { provider, signer } = useContext(EthersContext);
    const [post, setPost] = useState<Post>();
    const [reading, setReading] = useState(false);
    const [writing, setWriting] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useAsyncEffect(async () => {
        if (hash && provider) {
            setReading(true);
            try {
                const blog = getBlog(provider);
                const fetched = await blog.getPost(hash);
                const length = Number(await blog.numberOfRevisions(hash));
                const revisions = await Promise.all(
                    new Array(length).fill(0).map((_, index) => blog.revisionAt(hash, index))
                );
                setPost({
                    ...fetched,
                    revisions
                });
                if (revision === undefined || !revisions || Number(revision) >= revisions.length) {
                    setTitle(fetched.title);
                    setBody(fetched.body);
                } else {
                    setTitle(revisions[revision].title);
                    setBody(revisions[revision].body);
                }
            } finally {
                setReading(false);
            }
        }
    }, [hash, provider]);

    const create = async () => {
        if (title && body && signer) {
            setWriting(true);
            try {
                const blog = getBlog(signer);
                const tx = await blog.create(title, body, ethers.constants.HashZero);
                const receipt = await tx.wait();
                history.push("/post/" + receipt.events[0].args.hash);
            } finally {
                setWriting(false);
            }
        }
    };

    const update = async () => {
        if (hash && title && body && signer) {
            setWriting(true);
            try {
                const blog = getBlog(signer);
                const tx = await blog.update(hash, title, body);
                const receipt = await tx.wait();
                history.push("/post/" + receipt.events[0].args.hash);
            } finally {
                setWriting(false);
            }
        }
    };

    return { reading, writing, setWriting, post, title, setTitle, body, setBody, create, update };
};

export default usePostState;
