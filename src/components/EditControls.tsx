import React from "react";

import { Spacing } from "../constants/dimension";
import useColors from "../hooks/useColors";
import { PostState } from "../hooks/usePostState";
import Button from "./Button";
import FlexView from "./FlexView";

const EditControls = ({ state, onPreview, update }: { state: PostState; onPreview: () => void; update?: boolean }) => {
    const { accent, textLight } = useColors();
    return (
        <FlexView style={{ width: "100%", paddingVertical: Spacing.small, justifyContent: "flex-end" }}>
            <Button type={"clear"} title={"Preview"} color={textLight} onPress={onPreview} />
            <Button
                type={"clear"}
                title={update ? "Update" : "Publish"}
                color={accent}
                disabled={!state.title || !state.body}
                loading={state.writing}
                onPress={update ? state.update : state.create}
            />
        </FlexView>
    );
};

export default EditControls;
