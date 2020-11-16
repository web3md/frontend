import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Icon } from "react-native-elements";
import { Link, useRouteMatch } from "react-router-dom";

import Modal from "modal-react-native-web";
import { Spacing } from "../../constants/dimension";
import useColors from "../../hooks/useColors";
import DarkModeSwitch from "../DarkModeSwitch";
import FlexView from "../FlexView";
import Text from "../Text";

const MobileWebMenu = ({ expanded, onCollapse }) => {
    const { overlay } = useColors();
    return (
        <Modal animationType="slide" transparent={true} visible={expanded}>
            <TouchableWithoutFeedback style={{ height: "100%" }} onPress={onCollapse}>
                <View
                    style={{
                        height: "100%",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        paddingRight: Spacing.normal,
                        paddingBottom: Spacing.normal,
                        backgroundColor: overlay
                    }}>
                    <FlexView style={{ marginTop: Spacing.small }}>
                        <DarkModeSwitch style={{ marginTop: -2 }} />
                        <CloseButton onPress={onCollapse} />
                    </FlexView>
                    <View style={{ alignItems: "flex-end" }}>
                        <View style={{ height: Spacing.large }} />
                        <MobileWebMenuItem title={"New Post"} path={"/"} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const CloseButton = ({ onPress }) => {
    const { textDark } = useColors();
    return <Icon type={"material-community"} name={"close"} color={textDark} size={32} onPress={onPress} />;
};

const MobileWebMenuItem = ({ title, path }) => {
    const { textDark, textLight } = useColors();
    const match = useRouteMatch(path);
    const active = match?.path?.startsWith(path);
    return (
        <Link to={path} style={{ textDecoration: "none", marginBottom: Spacing.tiny }}>
            <Text
                style={{
                    fontFamily: "regular",
                    fontSize: 24,
                    color: active ? textDark : textLight
                }}>
                {title}
            </Text>
        </Link>
    );
};

export default MobileWebMenu;
