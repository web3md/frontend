import React from "react";
import { View } from "react-native";

import Container from "../components/Container";
import Content from "../components/Content";
import Title from "../components/Title";
import WebHeader from "../components/web/WebHeader";
import useColors from "../hooks/useColors";
import Screen from "./Screen";

const EmptyScreen = () => {
    const { background } = useColors();
    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: background }}>
            <Screen>
                <Container>
                    <Content>
                        <Title text={"Loading..."} style={{ fontFamily: "code" }} />
                    </Content>
                </Container>
            </Screen>
            <WebHeader />
        </View>
    );
};

export default EmptyScreen;
