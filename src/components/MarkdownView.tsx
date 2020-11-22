import React from "react";
import Markdown from "react-native-markdown-display";

import { Spacing } from "../constants/dimension";
import useColors from "../hooks/useColors";

const MarkdownView = ({ text }) => {
    const { textDark, accent, backgroundLight } = useColors();
    const styles = {
        heading1: { fontFamily: "bold", marginTop: Spacing.normal, marginBottom: Spacing.tiny },
        heading2: { fontFamily: "bold", marginTop: Spacing.normal, marginBottom: Spacing.tiny },
        heading3: { fontFamily: "bold", marginTop: Spacing.small, marginBottom: Spacing.tiny },
        heading4: { fontFamily: "bold", marginTop: Spacing.small },
        heading5: { fontFamily: "bold", marginTop: Spacing.tiny },
        heading6: { fontFamily: "bold", marginTop: Spacing.tiny },
        body: { fontFamily: "regular", color: textDark, fontSize: 15, lineHeight: 27.5 },
        code_inline: { padding: 2, color: accent, backgroundColor: backgroundLight }
    };
    return (
        <Markdown
            onLinkPress={url => {
                window.open(url, "_blank");
                return false;
            }}
            style={styles}>
            {text}
        </Markdown>
    );
};

export default MarkdownView;
