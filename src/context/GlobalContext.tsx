import React, { useState } from "react";
import { useColorScheme } from "react-native-appearance";

import AsyncStorage from "@react-native-community/async-storage";

export const GlobalContext = React.createContext({
    load: async () => {},
    clear: async () => {},
    darkMode: false,
    setDarkMode: async _darkMode => {}
});

// tslint:disable-next-line:max-func-body-length
export const GlobalContextProvider = ({ children }) => {
    const colorScheme = useColorScheme();
    const [darkMode, setDarkMode] = useState(colorScheme === "dark");
    return (
        <GlobalContext.Provider
            value={{
                load: async () => {
                    const mode = await AsyncStorage.getItem("dark_mode");
                    setDarkMode(mode === "true");
                },
                clear: async () => {
                    setDarkMode(false);
                    await AsyncStorage.removeItem("dark_mode");
                },
                darkMode,
                setDarkMode: async (mode: boolean) => {
                    await AsyncStorage.setItem("dark_mode", String(mode));
                    setDarkMode(mode);
                }
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const GlobalContextConsumer = GlobalContext.Consumer;
