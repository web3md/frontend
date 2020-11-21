import React from "react";
import { View, ViewProps } from "react-native";

import { DESKTOP_CONTENT_WIDTH, IS_DESKTOP, Spacing } from "../constants/dimension";

const Content: React.FunctionComponent<ViewProps> = props => {
    return (
        <View
            {...props}
            style={[
                {
                    width: IS_DESKTOP ? DESKTOP_CONTENT_WIDTH : "100%",
                    alignSelf: "center",
                    paddingHorizontal: Spacing.normal,
                    paddingVertical: Spacing.large
                },
                props.style
            ]}
        />
    );
};
export default Content;
