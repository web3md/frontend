import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { useParams } from "react-router-dom";

import { ethers } from "ethers";
import moment from "moment";
import useAsyncEffect from "use-async-effect";
import CenteredModal from "../components/CeneteredModal";
import Container from "../components/Container";
import Content from "../components/Content";
import FlexView from "../components/FlexView";
import Loading from "../components/Loading";
import MarkdownView from "../components/MarkdownView";
import Text from "../components/Text";
import Title from "../components/Title";
import { SCREEN_WIDTH, Spacing } from "../constants/dimension";
import { EthersContext } from "../context/EthersContext";
import useBlog from "../hooks/useBlog";
import useColors from "../hooks/useColors";
import useFormattedAddress from "../hooks/useFormattedAddress";
import useLinker from "../hooks/useLinker";
import Post from "../types/Post";
import Screen from "./Screen";

const ViewScreen = () => {
    const { hash, revision } = useParams();
    const { provider } = useContext(EthersContext);
    const [post, setPost] = useState<Post>();
    const [open, setOpen] = useState(false);
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
                            <PostView post={post} revision={revision} setOpen={setOpen} />
                        )
                    ) : (
                        <Loading />
                    )}
                </Content>
            </Container>
            <RevisionsModal hash={hash} post={post} open={open} setOpen={setOpen} />
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

const PostView = ({ post, revision, setOpen }) => {
    const address = useFormattedAddress(post.author);
    const onPress = useLinker("https://etherscan.io/address/" + post.author, "_blank");
    const noRevision = revision === undefined || revision >= post.revisions.length;
    const title = noRevision ? post.title : post.revisions[revision].title;
    const body = noRevision ? post.body : post.revisions[revision].body;
    const date = new Date(
        noRevision ? post.updatedAt.toNumber() * 1000 : post.revisions[revision].createdAt.toNumber() * 1000
    );
    return (
        <View>
            <Title text={title} />
            <FlexView style={{ justifyContent: "flex-end", marginBottom: Spacing.small }}>
                <Text note={true}>
                    Written by{" "}
                    <Text style={{ textDecorationLine: "underline" }} onPress={onPress}>
                        {address}
                    </Text>{" "}
                    |{" "}
                    <Text style={{ textDecorationLine: "underline" }} onPress={() => setOpen(true)}>
                        {noRevision ? "latest" : "Revision " + revision}
                    </Text>{" "}
                    | {moment(date).format("L LT")}{" "}
                </Text>
            </FlexView>
            <MarkdownView text={body} />
        </View>
    );
};

const RevisionsModal = ({ hash, post, open, setOpen }) => {
    const { backgroundLight, textDark } = useColors();
    return (
        <CenteredModal visible={open}>
            <View
                style={{
                    backgroundColor: backgroundLight,
                    padding: Spacing.normal,
                    width: SCREEN_WIDTH > 400 ? 400 : "100%"
                }}>
                <FlexView style={{ alignItems: "center" }}>
                    <Text style={{ flex: 1, fontSize: 24 }}>Revisions</Text>
                    <Icon type={"material-community"} name={"close"} onPress={() => setOpen(false)} color={textDark} />
                </FlexView>
                {post?.revisions?.map((revision, index) => (
                    <Revision key={index} hash={hash} index={index} createdAt={revision.createdAt} setOpen={setOpen} />
                ))}
            </View>
        </CenteredModal>
    );
};

const Revision = ({ hash, index, createdAt, setOpen }) => {
    const date = new Date(createdAt.toNumber() * 1000);
    const goToPost = useLinker("/post/" + hash + "/" + index);
    const onPress = () => {
        goToPost();
        setOpen(false);
    };
    return (
        <View style={{ marginVertical: Spacing.small }}>
            <Text onPress={onPress} style={{ textDecorationLine: "underline" }}>
                {"Revision " + index + ": " + moment(date).format("L LT")}
            </Text>
        </View>
    );
};

export default ViewScreen;
