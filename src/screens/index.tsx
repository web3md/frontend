import React, { Suspense, useContext, useState } from "react";
import { View } from "react-native";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import useAsyncEffect from "use-async-effect";
import WebHeader from "../components/web/WebHeader";
import { GlobalContext } from "../context/GlobalContext";
import useColors from "../hooks/useColors";
import EmptyScreen from "./EmptyScreen";
import NewScreen from "./NewScreen";
import ViewScreen from "./ViewScreen";

export const Screens = () => {
    const { load } = useContext(GlobalContext);
    useAsyncEffect(load, []);
    return <WebScreens />;
};

// tslint:disable-next-line:max-func-body-length
const WebScreens = () => {
    const [menuExpanded, setMenuExpanded] = useState(false);
    const { background } = useColors();
    return (
        <Router>
            <Suspense fallback={<EmptyScreen />}>
                <View style={{ flex: 1, backgroundColor: background }}>
                    <Switch>
                        <Route path={"/post/:hash"}>
                            <ViewScreen />
                        </Route>
                        <Route path={"/new"}>
                            <NewScreen />
                        </Route>
                        <Redirect to={"/new"} />
                    </Switch>
                    <WebHeader onExpandMenu={() => setMenuExpanded(true)} />
                </View>
            </Suspense>
        </Router>
    );
};
