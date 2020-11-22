import React from "react";
import { Platform } from "react-native";
import { Input } from "react-native-elements";

import useColors from "../hooks/useColors";
import { PostState } from "../hooks/usePostState";

const TitleInput = ({ state }: { state: PostState }) => {
    const { textDark } = useColors();
    return (
        <Input
            autoFocus={true}
            placeholder={"Title"}
            editable={!state.writing}
            value={state.title}
            onChangeText={state.setTitle}
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

export default TitleInput;
