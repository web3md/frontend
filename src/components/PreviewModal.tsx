import React from "react";
import { ScrollView, View } from "react-native";
import { Icon } from "react-native-elements";

import Modal from "modal-react-native-web";
import { HEADER_HEIGHT, Spacing } from "../constants/dimension";
import useColors from "../hooks/useColors";
import { PostState } from "../hooks/usePostState";
import Content from "./Content";
import FlexView from "./FlexView";
import MarkdownView from "./MarkdownView";
import Text from "./Text";
import Title from "./Title";

const PreviewModal = ({
    state,
    open,
    setOpen
}: {
    state: PostState;
    open: boolean;
    setOpen: (open: boolean) => void;
}) => {
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
                <Title text={state.title} style={{ marginTop: Spacing.normal }} />
                <View style={{ height: Spacing.small }} />
                <ScrollView style={{ flex: 1 }}>
                    <MarkdownView text={state.body} />
                </ScrollView>
            </Content>
        </Modal>
    );
};

export default PreviewModal;
