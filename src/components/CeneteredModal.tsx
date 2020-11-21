import React from "react";
import { View } from "react-native";

import Modal from "modal-react-native-web";
import useColors from "../hooks/useColors";

const CenteredModal = props => {
    const { overlay } = useColors();
    return (
        <Modal animationType="fade" transparent={true} visible={props.visible}>
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: overlay
                }}>
                {props.children}
            </View>
        </Modal>
    );
};

export default CenteredModal;
