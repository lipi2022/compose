import React, { useCallback, useMemo, useState, MouseEvent } from "react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import isHotkey from "is-hotkey";
import { CustomElement, CustomText } from "./custom-types";
import { BlockButton, MarkButton, PureButton, toggleMark } from "./components";

const HOTKEYS: { [key: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const Element = ({
  attributes,
  children,
  element,
}: {
  attributes: React.ReactNode;
  children: React.ReactNode;
  element: CustomElement;
}) => {
  switch (element.type) {
    case "block-quote":
      console.log("block quote");
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    // case "heading-one":
    //   return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    // case "numbered-list":
    //   return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: any;
  children: React.ReactNode;
  leaf: CustomText;
}) => {
  // console.log(leaf);
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }],
  },
];

export default function Compose() {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div className="bg-white w-6/12 h-64 shadow-md rounded-lg divide-y-2 divide-slate-50">
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <div className="h-10 flex  items-center gap-4 pl-2">
          <MarkButton format="bold"></MarkButton>
          <MarkButton format="italic"></MarkButton>
          <MarkButton format="underline"></MarkButton>
          <MarkButton format="code"></MarkButton>
          <BlockButton format="listol"></BlockButton>
          <BlockButton format="listul"></BlockButton>
          <BlockButton format="block-quote"></BlockButton>
          <BlockButton format="heading-one"></BlockButton>
          <BlockButton format="heading-two"></BlockButton>
          <BlockButton format="heading-three"></BlockButton>
          <PureButton format="image"></PureButton>
          <PureButton format="upload"></PureButton>
        </div>
        <div className="pl-4 pt-2">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck={false}
            autoFocus
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </div>
      </Slate>
    </div>
  );
}
