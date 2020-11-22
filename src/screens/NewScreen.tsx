import React, { useState } from "react";

import BodyInput from "../components/BodyInput";
import Container from "../components/Container";
import Content from "../components/Content";
import EditControls from "../components/EditControls";
import PreviewModal from "../components/PreviewModal";
import TitleInput from "../components/TitleInput";
import usePostState from "../hooks/usePostState";
import Screen from "./Screen";

const NewScreen = () => {
    const state = usePostState();
    const [open, setOpen] = useState(false);
    return (
        <Screen>
            <Container>
                <Content style={{ height: "100%", paddingBottom: 0 }}>
                    <TitleInput state={state} />
                    <BodyInput state={state} />
                    <EditControls state={state} onPreview={() => setOpen(true)} />
                </Content>
            </Container>
            <PreviewModal state={state} open={open} setOpen={setOpen} />
        </Screen>
    );
};

export default NewScreen;
