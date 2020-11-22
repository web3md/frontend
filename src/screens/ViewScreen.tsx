import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { useParams } from "react-router-dom";

import { ethers } from "ethers";
import moment from "moment";
import Button from "../components/Button";
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
import useColors from "../hooks/useColors";
import useFormattedAddress from "../hooks/useFormattedAddress";
import useLinker from "../hooks/useLinker";
import usePostState from "../hooks/usePostState";
import Screen from "./Screen";

const ViewScreen = () => {
    const { hash, revision } = useParams();
    const state = usePostState(hash);
    const [open, setOpen] = useState(false);
    return (
        <Screen allowRead={true}>
            <Container>
                <Content>
                    {state.reading ? (
                        <Loading />
                    ) : !state.post || state.post.author === ethers.constants.AddressZero ? (
                        <NotFound />
                    ) : (
                        <PostView hash={hash} post={state.post} revision={revision} setOpen={setOpen} />
                    )}
                </Content>
            </Container>
            {state.post && <RevisionsModal hash={hash} post={state.post} open={open} setOpen={setOpen} />}
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

const PostView = ({ hash, post, revision, setOpen }) => {
    const { address } = useContext(EthersContext);
    const addr = useFormattedAddress(post.author);
    const onViewAddress = useLinker("https://etherscan.io/address/" + post.author, "_blank");
    const noRevision = revision === undefined || revision >= post.revisions.length;
    const title = noRevision ? post.title : post.revisions[revision].title;
    const body = noRevision ? post.body : post.revisions[revision].body;
    const date = noRevision ? post.updatedAt : post.revisions[revision].createdAt;
    const isAuthor = post?.author?.toLowerCase() === address?.toLowerCase();
    return (
        <View>
            <Title text={title} />
            <FlexView style={{ justifyContent: "flex-end" }}>
                <Text note={true}>
                    Written by{" "}
                    <Text style={{ textDecorationLine: "underline" }} onPress={onViewAddress}>
                        {addr}
                    </Text>{" "}
                    |{" "}
                    <Text style={{ textDecorationLine: "underline" }} onPress={() => setOpen(true)}>
                        {noRevision ? "latest" : "Revision " + revision}
                    </Text>{" "}
                    | {moment(new Date(date.toNumber() * 1000)).format("L LT")}{" "}
                </Text>
            </FlexView>
            <View style={{ height: Spacing.small }} />
            <MarkdownView text={body} />
            {isAuthor && <AuthorControls hash={hash} />}
        </View>
    );
};

const AuthorControls = ({ hash }) => {
    const onEdit = useLinker("/edit/" + hash);
    const { accent } = useColors();
    return (
        <FlexView style={{ justifyContent: "flex-end", marginBottom: Spacing.small }}>
            <Button type={"clear"} color={accent} onPress={onEdit} title={"Edit"} />
        </FlexView>
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
                <FlexView style={{ alignItems: "center", marginBottom: Spacing.small }}>
                    <Text style={{ flex: 1, fontSize: 24 }}>Revisions</Text>
                    <Icon type={"material-community"} name={"close"} onPress={() => setOpen(false)} color={textDark} />
                </FlexView>
                {post.revisions
                    .slice()
                    .reverse()
                    .map((revision, index) => (
                        <Revision
                            key={index}
                            hash={hash}
                            index={post.revisions.length - index - 1}
                            createdAt={revision.createdAt}
                            setOpen={setOpen}
                        />
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
        <Text onPress={onPress} style={{ textDecorationLine: "underline", marginBottom: Spacing.tiny }}>
            {"Revision " + index + ": " + moment(date).format("L LT")}
        </Text>
    );
};

export default ViewScreen;
