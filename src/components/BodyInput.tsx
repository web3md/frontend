import React from "react";
import { Platform } from "react-native";
import { Input } from "react-native-elements";

import { Spacing } from "../constants/dimension";
import useColors from "../hooks/useColors";
import { PostState } from "../hooks/usePostState";

const BodyInput = ({ state }: { state: PostState }) => {
    const { textDark } = useColors();
    return (
        <Input
            multiline={true}
            placeholder={"Tell your story..."}
            editable={!state.writing}
            value={state.body}
            onChangeText={state.setBody}
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

export default BodyInput;
