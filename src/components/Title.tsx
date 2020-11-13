import React, { FC } from "react";
import { TextStyle } from "react-native";

import { Spacing } from "../constants/dimension";
import Text from "./Text";

interface TitleProps {
    text: string;
    style?: TextStyle;
}

const Title: FC<TitleProps> = props => {
    return (
        <Text fontWeight={"bold"} style={[{ marginBottom: Spacing.tiny, fontSize: 40 }, props.style]}>
            {props.text}
        </Text>
    );
};

export default Title;
