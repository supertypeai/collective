import React, { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { insertList } from "@lexical/list";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import Image from "next/image";

const INSERT_ORDERED_LIST_COMMAND = "insert-ordered-list";
const INSERT_UNORDERED_LIST_COMMAND = "insert-unordered-list";

const ToolbarItem = ({ icon, label, onClick, isActive }) => {
  let style =
    "flex flex-col items-center justify-center w-10 h-9 hover:bg-neutral-200 focus:outline-none";
  if (isActive) {
    style += " bg-neutral-200";
  }

  return (
    <button
      className={style}
      onClick={onClick}
      aria-label={label}
      type="button"
    >
      <Image src={icon} alt={label} width={16} height={16} />
    </button>
  );
};

const Divider = () => {
  return (
    <div className="inline-block w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
  );
};
const Toolbar = ({ editable }) => {
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

  const createQuoteNode = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  const createHeadingNode = (h) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(h));
      }
    });
  };

  return (
    editable && (
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
        <Divider />
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
        <Divider />
        <ToolbarItem
          icon="/toolbar/quote.svg"
          label="Quote"
          onClick={() => createQuoteNode()}
        />
        <ToolbarItem
          icon="/toolbar/unordered-list.svg"
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
        <Divider />
        <ToolbarItem
          icon="/toolbar/type-h1.svg"
          label="Heading 1"
          onClick={() => createHeadingNode("h1")}
        />
        <ToolbarItem
          icon="/toolbar/type-h2.svg"
          label="Heading 2"
          onClick={() => createHeadingNode("h2")}
        />
        <ToolbarItem
          icon="/toolbar/type-h3.svg"
          label="Heading 3"
          onClick={() => createHeadingNode("h3")}
        />
      </div>
    )
  );
};

export default Toolbar;
