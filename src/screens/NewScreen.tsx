import React, { useContext } from "react";
import { Platform } from "react-native";
import { Input } from "react-native-elements";

import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import FlexView from "../components/FlexView";
import { Spacing } from "../constants/dimension";
import { EthersContext } from "../context/EthersContext";
import { GlobalContext } from "../context/GlobalContext";
import useBlog from "../hooks/useBlog";
import useColors from "../hooks/useColors";
import Screen from "./Screen";

const NewScreen = () => {
    const { title, setTitle, body, setBody } = useContext(GlobalContext);
    const { creatingPost, createPost } = useBlog();
    return (
        <Screen>
            <Container>
                <Content style={{ height: "100%", paddingBottom: 0 }}>
                    <TitleInput text={title} onChangeText={setTitle} loading={creatingPost} />
                    <BodyInput text={body} onChangeText={setBody} loading={creatingPost} />
                    <Controls loading={creatingPost} createPost={createPost} />
                </Content>
            </Container>
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

const Controls = ({ loading, createPost }) => {
    const { title, body } = useContext(GlobalContext);
    const { signer } = useContext(EthersContext);
    const { accent } = useColors();
    const onPress = async () => await createPost(title, body, signer);
    return (
        <FlexView style={{ width: "100%", paddingVertical: Spacing.small, justifyContent: "flex-end" }}>
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

export default NewScreen;
