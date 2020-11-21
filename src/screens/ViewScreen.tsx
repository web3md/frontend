import React, { useContext, useState } from "react";
import { View } from "react-native";
import { useParams } from "react-router-dom";

import { ethers } from "ethers";
import useAsyncEffect from "use-async-effect";
import Container from "../components/Container";
import Content from "../components/Content";
import Loading from "../components/Loading";
import MarkdownView from "../components/MarkdownView";
import Text from "../components/Text";
import Title from "../components/Title";
import { Spacing } from "../constants/dimension";
import { EthersContext } from "../context/EthersContext";
import useBlog from "../hooks/useBlog";
import Post from "../types/Post";
import Screen from "./Screen";

const ViewScreen = () => {
    const { hash } = useParams();
    const { provider } = useContext(EthersContext);
    const [post, setPost] = useState<Post>();
    const { fetchPost } = useBlog();
    useAsyncEffect(async () => {
        if (hash && provider) {
            setPost(await fetchPost(hash, provider));
        }
    }, [hash, provider]);
    return (
        <Screen allowRead={true}>
            <Container>
                <Content>
                    {post ? (
                        post.author === ethers.constants.AddressZero ? (
                            <NotFound />
                        ) : (
                            <>
                                <Title text={post.title} />
                                <View style={{ height: Spacing.small }} />
                                <MarkdownView text={post.body} />
                            </>
                        )
                    ) : (
                        <Loading />
                    )}
                </Content>
            </Container>
        </Screen>
    );
};

const NotFound = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginVertical: Spacing.huge }}>
        <Text light={true} style={{ textAlign: "center" }}>
            {"Post Not Found"}
        </Text>
    </View>
);

export default ViewScreen;
