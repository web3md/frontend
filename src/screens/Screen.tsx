import React, { FC, useContext } from "react";
import { View, ViewProps } from "react-native";

import Text from "../components/Text";
import ConnectToWallet from "../components/web/ConnectToWallet";
import { HEADER_HEIGHT } from "../constants/dimension";
import { EthersContext } from "../context/EthersContext";

export interface ScreenProps extends ViewProps {
    allowRead?: boolean;
}

const WebScreen: FC<ScreenProps> = props => {
    const { address, chainId } = useContext(EthersContext);
    if (!props.allowRead && !address) return <ConnectToWallet />;
    if (!props.allowRead && chainId !== 42)
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text light={true} style={{ textAlign: "center" }}>
                    {"Please switch network to\n'Kovan'"}
                </Text>
            </View>
        );
    return (
        <View
            {...props}
            style={[{ position: "absolute", top: HEADER_HEIGHT, right: 0, bottom: 0, left: 0 }, props.style]}
        />
    );
};

export default WebScreen;
