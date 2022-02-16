import React, { Ref, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { cx, css } from "@emotion/css";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import {
  RiBold,
  RiItalic,
  RiListUnordered,
  RiListOrdered,
  RiImageAddLine,
  RiSaveLine,
  RiCodeSSlashFill,
  RiChatQuoteLine,
  RiBookReadLine,
} from "react-icons/ri";
import { CustomElement, CustomText } from "./custom-types";
import { Icon } from "./icons";

const LIST_TYPES: string[] = ["numbered-list", "bulleted-list"];

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

export const ToolButton = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<HTMLSpanElement>
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "black"
            : "#ccc"};
        `
      )}
    />
  )
);

export const PureButton = ({
  editor,
  format,
}: {
  editor: Editor;
  format: string;
}) => {
  return (
    <ToolButton>
      <SvgIcon format={format}></SvgIcon>
    </ToolButton>
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
    <ToolButton
      active={isMarkActive(editor, format)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <SvgIcon format={format}></SvgIcon>
    </ToolButton>
  );
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  // console.log(marks);
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
    <ToolButton
      active={isBlockActive(editor, format)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <SvgIcon format={format}></SvgIcon>
    </ToolButton>
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

const SvgIcon = ({ format }: { format: string }) => {
  let icon;
  let color = "#bcbcbc";
  let hover_color = "black";
  let size = "18";

  return (
    <div className="hover:bg-slate-100 h-8 w-8 flex items-center justify-center">
      <Icon format={format} color={color} width={size} height={size}></Icon>
    </div>
  );
};
