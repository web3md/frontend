/* tslint:disable:ordered-imports */
import "./globals";
import React from "react";

import {
    SourceCodePro_200ExtraLight,
    SourceCodePro_400Regular,
    SourceCodePro_700Bold,
    useFonts
} from "@expo-google-fonts/source-code-pro";
import { AppLoading } from "expo";

import { ContextProvider } from "./src/context";
import { Screens } from "./src/screens";

export default function App() {
    const [fontsLoaded] = useFonts({
        light: SourceCodePro_200ExtraLight,
        regular: SourceCodePro_400Regular,
        bold: SourceCodePro_700Bold
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <ContextProvider>
            <Screens />
        </ContextProvider>
    );
}
