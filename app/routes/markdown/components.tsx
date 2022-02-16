import React, {
  Ref,
  PropsWithChildren,
  useState,
  MouseEventHandler,
} from "react";
import ReactDOM from "react-dom";
import { cx, css } from "@emotion/css";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";

import { CustomElement, CustomText } from "./custom-types";
import { Icon } from "./icons";

const LIST_TYPES: string[] = ["numbered-list", "bulleted-list"];

export const PureButton = ({
  editor,
  format,
}: {
  editor: Editor;
  format: string;
}) => {
  let light_color = "#bcbcbc";
  let dark_color = "black";
  const [color, setColor] = useState(light_color);
  let size = "18";
  return (
    <div
      className="hover:bg-slate-100 h-8 w-8 flex items-center justify-center"
      onMouseEnter={() => {
        setColor(dark_color);
      }}
      onMouseLeave={() => {
        setColor(light_color);
      }}
    >
      <Icon format={format} color={color} width={size} height={size}></Icon>
    </div>
  );
};

export const MarkButton = ({
  editor,
  format,
}: {
  editor: Editor;
  format: string;
}) => {
  return (
    <MarkIcon
      format={format}
      active={isMarkActive(editor, format)}
      editor={editor}
    ></MarkIcon>
  );
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as any)[format] === true : false; // to check
};

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const BlockButton = ({
  editor,
  format,
}: {
  editor: Editor;
  format: string;
}) => {
  return (
    <BlockIcon
      format={format}
      active={isBlockActive(editor, format)}
      editor={editor}
    ></BlockIcon>
  );
};
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

const MarkIcon = ({
  format,
  active,
  editor,
}: {
  format: string;
  editor: Editor;
  active?: boolean;
}) => {
  let light_color = "#bcbcbc";
  let dark_color = "black";
  let mark_color = active ? dark_color : light_color;
  const [color, setColor] = useState(mark_color);
  let size = "18";

  return (
    <div
      className="hover:bg-slate-100 h-8 w-8 flex items-center justify-center"
      onMouseEnter={() => {
        setColor(dark_color);
      }}
      onMouseLeave={() => {
        setColor(light_color);
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon format={format} color={color} width={size} height={size}></Icon>
    </div>
  );
};

const BlockIcon = ({
  format,
  active,
  editor,
}: {
  format: string;
  editor: Editor;
  active?: boolean;
}) => {
  let light_color = "#bcbcbc";
  let dark_color = "black";
  let mark_color = active ? dark_color : light_color;
  const [color, setColor] = useState(mark_color);
  let size = "18";

  return (
    <div
      className="hover:bg-slate-100 h-8 w-8 flex items-center justify-center"
      onMouseEnter={() => {
        setColor(dark_color);
      }}
      onMouseLeave={() => {
        setColor(light_color);
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon format={format} color={color} width={size} height={size}></Icon>
    </div>
  );
};
