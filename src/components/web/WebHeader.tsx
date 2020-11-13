import React, { FC, useContext } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { Link, useRouteMatch } from "react-router-dom";

import { HEADER_HEIGHT, HEADER_WIDTH, IS_DESKTOP, Spacing } from "../../constants/dimension";
import { GlobalContext } from "../../context/GlobalContext";
import useColors from "../../hooks/useColors";
import DarkModeSwitch from "../DarkModeSwitch";
import FlexView from "../FlexView";
import Text from "../Text";

export interface WebHeaderProps {
    onExpandMenu?: () => void;
}

const WebHeader: FC<WebHeaderProps> = props => {
    const { header } = useColors();
    return (
        <View
            // @ts-ignore
            style={{
                position: "fixed",
                top: 0,
                zIndex: 100,
                width: "100%",
                height: HEADER_HEIGHT,
                paddingBottom: Spacing.small,
                backgroundColor: header
            }}>
            <FlexView
                style={{
                    flex: 1,
                    width: IS_DESKTOP ? HEADER_WIDTH : "100%",
                    alignSelf: "center",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    paddingTop: Spacing.small,
                    paddingHorizontal: Spacing.normal
                }}>
                <Title />
                {IS_DESKTOP ? <Menu /> : <MenuIcon onExpand={props.onExpandMenu} />}
            </FlexView>
        </View>
    );
};

export const Title = () => {
    const { darkMode } = useContext(GlobalContext);
    const { textDark, white } = useColors();
    const color = darkMode ? white : textDark;
    return (
        <View style={{ alignSelf: "center", alignItems: "center" }}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
                <Text style={{ fontSize: 28, color }}>web3md.io</Text>
            </Link>
        </View>
    );
};

const Menu = () => {
    return (
        <FlexView
            style={{
                height: "100%",
                alignItems: "flex-end"
            }}>
            <DarkModeSwitch style={{ marginLeft: Spacing.tiny, marginRight: -8, marginBottom: -5 }} />
        </FlexView>
    );
};

const MenuItem = ({ title, path }) => {
    const { textDark, textLight } = useColors();
    const match = useRouteMatch(path);
    const active = match?.path?.startsWith(path);
    return (
        <Link to={path} style={{ marginLeft: Spacing.tiny, textDecoration: "none" }}>
            <Text style={{ fontFamily: "regular", fontSize: 18, color: active ? textDark : textLight, padding: 3 }}>
                {title}
            </Text>
        </Link>
    );
};

const MenuIcon = ({ onExpand }) => {
    const { textDark } = useColors();
    return <Icon type={"material-community"} name={"menu"} size={28} color={textDark} onPress={onExpand} />;
};

export default WebHeader;
