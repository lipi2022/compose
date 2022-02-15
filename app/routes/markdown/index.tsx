import React, { useCallback, useMemo, useState, MouseEvent } from "react";
import { IconContext } from "react-icons";
import {
  RiBold,
  RiItalic,
  RiListUnordered,
  RiListOrdered,
  RiImageAddLine,
  RiSaveLine,
  RiCodeSSlashFill,
  RiChatQuoteLine,
} from "react-icons/ri";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { ToolButton, SvgIcon } from "./components";
import isHotkey from "is-hotkey";
import { CustomElement, CustomText } from "./custom-types";

const HOTKEYS: { [key: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES: string[] = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as any)[format] === true : false; // to check
};

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const MarkButton = ({ format }: { format: string }) => {
  const editor = useSlate();
  return (
    <ToolButton
      active={isMarkActive(editor, format)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    ></ToolButton>
  );
};

const BlockButton = (format: string) => {
  const editor = useSlate();
  return (
    <ToolButton
      active={isBlockActive(editor, format)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <SvgIcon>{format}</SvgIcon>
    </ToolButton>
  );
};

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });

  let format_type: string = isActive
    ? "paragraph"
    : isList
    ? "list-item"
    : format;
  const newProperties: Partial<SlateElement> = {
    type: format_type as any, // to check
  };

  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    // 根据不同 format ，拆开成不同的 element, todo
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block as CustomElement);
  }
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

export default function Index() {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div className="container bg-slate-100  h-screen pt-32 mx-auto flex justify-center">
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <div className="bg-white w-6/12 h-64 shadow-md rounded-lg divide-y-2 divide-slate-50">
          <div className="h-10 flex  items-center gap-4 pl-1">
            <MarkButton format="bold"></MarkButton>
            <div className="hover:bg-slate-300 h-8 w-8 flex items-center justify-center">
              <RiBold size={20} color="gray" title="bold" />
            </div>
            <RiItalic size={22} color="gray" title="bold" />
            <RiCodeSSlashFill size={22} color="gray" title="bold" />
            <RiChatQuoteLine size={22} color="gray" title="bold" />
            <RiListUnordered size={22} color="gray" title="bold" />
            <RiListOrdered size={22} color="gray" title="bold" />
            <RiImageAddLine size={22} color="gray" title="bold" />
            <RiSaveLine size={22} color="gray" title="bold" />
          </div>
          <div className="pl-2.5 pt-2">
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some rich text…"
              spellCheck
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
        </div>
      </Slate>
    </div>
  );
}
