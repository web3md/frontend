import React, { useContext, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import { Icon, Input } from "react-native-elements";

import Modal from "modal-react-native-web";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import FlexView from "../components/FlexView";
import MarkdownView from "../components/MarkdownView";
import Text from "../components/Text";
import Title from "../components/Title";
import { HEADER_HEIGHT, Spacing } from "../constants/dimension";
import { EthersContext } from "../context/EthersContext";
import { GlobalContext } from "../context/GlobalContext";
import useBlog from "../hooks/useBlog";
import useColors from "../hooks/useColors";
import Screen from "./Screen";

const NewScreen = () => {
    const { title, setTitle, body, setBody } = useContext(GlobalContext);
    const { creatingPost, createPost } = useBlog();
    const [open, setOpen] = useState(false);
    return (
        <Screen>
            <Container>
                <Content style={{ height: "100%", paddingBottom: 0 }}>
                    <TitleInput text={title} onChangeText={setTitle} loading={creatingPost} />
                    <BodyInput text={body} onChangeText={setBody} loading={creatingPost} />
                    <Controls loading={creatingPost} createPost={createPost} setOpen={setOpen} />
                </Content>
            </Container>
            <PreviewModal open={open} setOpen={setOpen} />
        </Screen>
    );
};

const TitleInput = ({ text, onChangeText, loading }) => {
    const { textDark } = useColors();
    return (
        <Input
            autoFocus={true}
            placeholder={"Title"}
            editable={!loading}
            value={text}
            onChangeText={onChangeText}
            inputStyle={[
                {
                    width: "100%",
                    fontSize: 40,
                    fontFamily: "regular",
                    paddingBottom: 4,
                    color: textDark
                },
                // @ts-ignore
                Platform.OS === "web" ? { outline: "none" } : {}
            ]}
            containerStyle={{ paddingHorizontal: 0 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
        />
    );
};

const BodyInput = ({ text, onChangeText, loading }) => {
    const { textDark } = useColors();
    return (
        <Input
            multiline={true}
            placeholder={"Tell your story..."}
            editable={!loading}
            value={text}
            onChangeText={onChangeText}
            inputStyle={[
                {
                    fontSize: 15,
                    fontFamily: "regular",
                    lineHeight: 27.5,
                    paddingBottom: 4,
                    color: textDark,
                    textAlignVertical: "top",
                    minHeight: 80,
                    height: "100%"
                },
                // @ts-ignore
                Platform.OS === "web" ? { outline: "none" } : {}
            ]}
            containerStyle={{ paddingHorizontal: 0, flex: 1 }}
            inputContainerStyle={{ borderBottomWidth: 0, height: "100%" }}
            style={{ marginTop: Spacing.small, flex: 1 }}
        />
    );
};

const Controls = ({ loading, createPost, setOpen }) => {
    const { title, body } = useContext(GlobalContext);
    const { signer } = useContext(EthersContext);
    const { accent, textLight } = useColors();
    const onPress = async () => await createPost(title, body, signer);
    return (
        <FlexView style={{ width: "100%", paddingVertical: Spacing.small, justifyContent: "flex-end" }}>
            <Button type={"clear"} title={"Preview"} color={textLight} onPress={() => setOpen(true)} />
            <Button
                type={"clear"}
                title={"Publish"}
                color={accent}
                disabled={!title || !body}
                loading={loading}
                onPress={onPress}
            />
        </FlexView>
    );
};

const PreviewModal = ({ open, setOpen }) => {
    const { title, body } = useContext(GlobalContext);
    const { textDark, backgroundLight } = useColors();
    return (
        <Modal animationType="slide" transparent={true} visible={open}>
            <Content
                style={{
                    backgroundColor: backgroundLight,
                    height: "100%",
                    marginTop: HEADER_HEIGHT,
                    paddingVertical: Spacing.normal
                }}>
                <FlexView style={{ alignItems: "center" }}>
                    <Text style={{ flex: 1, fontSize: 24 }}>Preview</Text>
                    <Icon
                        type={"material-community"}
                        name={"close"}
                        onPress={() => setOpen(false)}
                        size={32}
                        color={textDark}
                    />
                </FlexView>
                <Title text={title} style={{ marginTop: Spacing.normal }} />
                <View style={{ height: Spacing.small }} />
                <ScrollView style={{ flex: 1 }}>
                    <MarkdownView text={body} />
                </ScrollView>
            </Content>
        </Modal>
    );
};

export default NewScreen;
