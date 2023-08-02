import { CodeNode } from "@lexical/code";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";

export const NODES = [
  HeadingNode,
  QuoteNode,
  CodeNode,
  ListNode,
  ListItemNode,
  LinkNode,
  AutoLinkNode,
];

const makeJSONCompatible = (text) => {
  return text.replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r");
}

export const legacyTextCompatibility = (text) => {
  let result;
  try {
    // if the the text can be parsed as JSON, return the text
    JSON.parse(text);
    return text;
  } catch (error) {
    result = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${text}","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;
    result = makeJSONCompatible(result);
  }

  return result;
};

export const theme = {
  ltr: "text-left",
  rtl: "text-right",
  paragraph: "m-0 mb-4",
  link: "cursor-pointer text-blue-500 hover:underline",
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
  heading: {
    h1: "text-4xl font-bold mb-4",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-bold",
    h5: "text-lg font-bold",
    h6: "text-base font-bold",
  }
};

const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export const MATCHERS = [
  (text) => {
    const match = URL_MATCHER.exec(text);
    if (match === null) {
      return null;
    }
    const fullMatch = match[0];
    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith("http") ? fullMatch : `https://${fullMatch}`,
      // attributes: { rel: 'noreferrer', target: '_blank' }, // Optional link attributes
    };
  },
];
