import React, { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { insertList } from "@lexical/list";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";

const INSERT_ORDERED_LIST_COMMAND = "insert-ordered-list";
const INSERT_UNORDERED_LIST_COMMAND = "insert-unordered-list";

const ToolbarItem = ({ icon, label, onClick, isActive }) => {
  
  let style =
    "flex flex-col items-center justify-center w-10 h-9 hover:bg-neutral-200 focus:outline-none";
  if (isActive) {
    style += " bg-neutral-200";
  }

  return (
    <button className={style} onClick={onClick} aria-label={label}>
      <img src={icon} alt={label} className="w-4 h-4" />
    </button>
  );
};

const Toolbar = ({ editable }) => {
  if (!editable) return;

  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  editor.registerCommand(
    INSERT_ORDERED_LIST_COMMAND,
    () => {
      insertList(editor, "number");
      return true;
    },
    COMMAND_PRIORITY_LOW
  );

  editor.registerCommand(
    INSERT_UNORDERED_LIST_COMMAND,
    () => {
      insertList(editor, "bullet");
      return true;
    },
    COMMAND_PRIORITY_LOW
  );

  return (
    <div className="flex bg-white border-neutral-200 rounded-sm border">
      <ToolbarItem
        icon="/toolbar/undo.svg"
        label="Undo"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND)}
      />
      <ToolbarItem
        icon="/toolbar/redo.svg"
        label="Redo"
        onClick={() => editor.dispatchCommand(REDO_COMMAND)}
      />
      <div className="inline-block w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
      <ToolbarItem
        icon="/toolbar/bold.svg"
        label="Bold"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          setIsBold(!isBold);
        }}
        isActive={isBold}
      />
      <ToolbarItem
        icon="/toolbar/italic.svg"
        label="Italic"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          setIsItalic(!isItalic);
        }}
        isActive={isItalic}
      />
      <ToolbarItem
        icon="/toolbar/underline.svg"
        label="Underline"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          setIsUnderline(!isUnderline);
        }}
        isActive={isUnderline}
      />
      <div className="inline-block w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
      {/* <ToolbarItem
        icon="/toolbar/quote.svg"
        label="Quote"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "quote")}
      /> */}
      <ToolbarItem
        icon="/toolbar/list.svg"
        label="Unordered List"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)}
      />
      <ToolbarItem
        icon="/toolbar/ordered-list.svg"
        label="Ordered List"
        onClick={() => {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
        }}
      />
      {/* <ToolbarItem
        icon="/toolbar/link.svg"
        label="Link"
        onClick={() => editor.dispatchCommand(TOGGLE_LINK_COMMAND)}
      /> */}
    </div>
  );
};

export default Toolbar;
