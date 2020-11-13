import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { useParams } from "react-router-dom";

import { ethers } from "ethers";
import useAsyncEffect from "use-async-effect";
import Container from "../components/Container";
import Content from "../components/Content";
import Loading from "../components/Loading";
import Text from "../components/Text";
import Title from "../components/Title";
import { Spacing } from "../constants/dimension";
import { EthersContext } from "../context/EthersContext";
import useBlog from "../hooks/useBlog";
import Post from "../types/Post";
import Screen from "./Screen";

const ViewScreen = () => {
    const { hash } = useParams();
    const { signer } = useContext(EthersContext);
    const [post, setPost] = useState<Post>();
    const { fetchPost } = useBlog();
    useAsyncEffect(async () => {
        if (hash && signer) {
            setPost(await fetchPost(hash, signer));
        }
    }, [hash, signer]);
    return (
        <Screen>
            <Container>
                <Content>
                    {post ? (
                        post.author === ethers.constants.AddressZero ? (
                            <NotFound />
                        ) : (
                            <>
                                <Title text={post.title} />
                                <View style={{ height: Spacing.small }} />
                                <Body text={post.body} />
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

const Body = ({ text }) => {
    return (
        <Markdown
            onLinkPress={url => {
                window.open(url, "_blank");
                return true;
            }}
            style={styles}>
            {text}
        </Markdown>
    );
};

const NotFound = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginVertical: Spacing.huge }}>
        <Text light={true} style={{ textAlign: "center" }}>
            {"Post Not Found"}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    heading1: { fontFamily: "bold", marginTop: Spacing.normal, marginBottom: Spacing.tiny },
    heading2: { fontFamily: "bold", marginTop: Spacing.small, marginBottom: Spacing.tiny },
    heading3: { fontFamily: "bold", marginTop: Spacing.small, marginBottom: Spacing.tiny },
    heading4: { fontFamily: "bold", marginTop: Spacing.tiny },
    heading5: { fontFamily: "bold", marginTop: Spacing.tiny },
    heading6: { fontFamily: "bold", marginTop: Spacing.tiny },
    body: { fontFamily: "regular", fontSize: 15, lineHeight: 27.5 }
});

export default ViewScreen;
