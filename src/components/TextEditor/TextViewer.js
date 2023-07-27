import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { legacyTextCompatibility, NODES, MATCHERS, theme } from "./common";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

const viewerTheme = {
  ...theme,
  root: "h-full focus:outline-none focus-visible:border-white text-slate-200",
};

function onError(error) {
  console.error(error);
}

const TextViewer = ({ text }) => {
  const initialConfig = {
    namespace: "IntroductionViewer",
    theme: viewerTheme,
    onError: onError,
    nodes: NODES,
    editorState: legacyTextCompatibility(text),
    editable: false,
  };

  return (
    <div
      id="editor-wrapper"
      className={
        "relative prose-p:my-0 prose-headings:mb-4 prose-headings:mt-2 pt-1"
      }
    >
      <LexicalComposer initialConfig={initialConfig} name="long">
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={<ContentEditable />}
        />
        <ListPlugin />
        <AutoLinkPlugin matchers={MATCHERS} />
      </LexicalComposer>
    </div>
  );
};

export default TextViewer;
