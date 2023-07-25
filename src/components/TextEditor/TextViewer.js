import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { legacyTextCompatibility, NODES, MATCHERS } from "./common";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

const theme = {
  root: "h-full focus:outline-none focus-visible:border-white text-slate-200",
  ltr: "text-left",
  rtl: "text-right",
  paragraph: "m-0 mb-4",
  link: "cursor-pointer",
  text: {
    bold: "font-bold",
    underline: "underline",
    italic: "italic",
    strikethrough: "line-through",
    underlineStrikethrough: "underlined-line-through",
  },
  list: {
    ul: "list-disc ml-5",
    ol: "list-decimal ml-5",
  },
  quote: "border-l-4 border-neutral-200 pl-4",
};

function onError(error) {
  console.error(error);
}

const TextViewer = ({ text }) => {
  const initialConfig = {
    namespace: "IntroductionViewer",
    theme: theme,
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
