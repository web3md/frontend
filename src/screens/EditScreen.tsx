import React, { useState } from "react";
import { View } from "react-native";
import { useParams } from "react-router-dom";

import BodyInput from "../components/BodyInput";
import Container from "../components/Container";
import Content from "../components/Content";
import EditControls from "../components/EditControls";
import Loading from "../components/Loading";
import PreviewModal from "../components/PreviewModal";
import TitleInput from "../components/TitleInput";
import usePostState, { PostState } from "../hooks/usePostState";
import Screen from "./Screen";

const EditScreen = () => {
    const { hash, revision } = useParams();
    const state = usePostState(hash, revision);
    const [open, setOpen] = useState(false);
    return (
        <Screen>
            <Container>
                <Content style={{ height: "100%", paddingBottom: 0 }}>
                    {state.post ? <Editor state={state} onPreview={() => setOpen(true)} /> : <Loading />}
                </Content>
            </Container>
            <PreviewModal state={state} open={open} setOpen={setOpen} />
        </Screen>
    );
};

const Editor = ({ state, onPreview }: { state: PostState; onPreview: () => void }) => {
    return (
        <View style={{ height: "100%" }}>
            <TitleInput state={state} />
            <BodyInput state={state} />
            <EditControls state={state} onPreview={onPreview} update={true} />
        </View>
    );
};

export default EditScreen;
