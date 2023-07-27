import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

import { legacyTextCompatibility, NODES, MATCHERS, theme } from "./common";
import Toolbar from "./Toolbar";

const editorTheme = {
  ...theme,
  root: "p-4 rounded h-full min-h-[100px] focus:outline-none focus-visible:border-white bg-white text-black",
};

function onError(error) {
  console.error(error);
}

const Placeholder = ({ isEditing, text }) => {
  if (text) return;

  let style =
    "overflow-hidden absolute top-4 left-4 text-black select-none pointer-events-none opacity-50";
  if (isEditing) style += " top-14";

  return (
    <div className={style}>
      I am a data scientist with 3 years of experience in the industry and a
      Fellow at Supertype Fellowship. I am passionate about open source and have
      contributed to several projects under this program.
    </div>
  );
};

const SetEditablePlugin = ({ isEditting }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      editor.setEditable(isEditting);
    });
  }, [isEditting]);
};

const EditorCapturePlugin = React.forwardRef((props, ref) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    ref.current = editor;
    return () => {
      ref.current = null;
    };
  }, [editor, ref]);

  return null;
});

const TextEditor = React.forwardRef((props, ref) => {
  let { initialContent, isEditting } = props;

  const initialConfig = {
    namespace: "IntroductionEditor",
    theme: editorTheme,
    onError: onError,
    nodes: NODES,
    editable: isEditting,
    editorState: legacyTextCompatibility(initialContent),
  };

  return (
    <div
      id="editor-wrapper"
      className={
        "relative prose-p:my-0 prose-headings:mb-4 prose-headings:mt-2 pt-1"
      }
    >
      <LexicalComposer initialConfig={initialConfig} name="long">
        <Toolbar editable={isEditting} />
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={
            <Placeholder isEditing={isEditting} text={initialContent} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <ListPlugin />
        <AutoLinkPlugin matchers={MATCHERS} />
        <SetEditablePlugin isEditting={isEditting} />
        <EditorCapturePlugin ref={ref} />
      </LexicalComposer>
    </div>
  );
});

export default TextEditor;
