import React, { useCallback } from "react";
import { View } from "react-native";

import { Spacing } from "../../constants/dimension";
import Text from "../Text";

const WebFooter = () => (
    <View
        style={{
            width: "100%",
            padding: Spacing.normal,
            marginTop: Spacing.huge
        }}>
        <Text note={true} style={{ textAlign: "center", width: "100%" }}>
            2020 Built by <Link to={"https://levx.io"} text={"LevX Team"} />
        </Text>
    </View>
);

const Link = ({ to, text }) => {
    const onPress = useCallback(() => {
        window.open(to, "_blank");
    }, []);
    return (
        <Text note={true} style={{ textDecorationLine: "underline" }} onPress={onPress}>
            {text}
        </Text>
    );
};

export default WebFooter;
