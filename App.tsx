/* tslint:disable:ordered-imports */
import "./globals";
import React from "react";

import {
    CormorantGaramond_300Light,
    CormorantGaramond_400Regular,
    CormorantGaramond_700Bold,
    useFonts
} from "@expo-google-fonts/cormorant-garamond";
import { AppLoading } from "expo";

import { ContextProvider } from "./src/context";
import { Screens } from "./src/screens";

export default function App() {
    const [fontsLoaded] = useFonts({
        light: CormorantGaramond_300Light,
        regular: CormorantGaramond_400Regular,
        bold: CormorantGaramond_700Bold
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
