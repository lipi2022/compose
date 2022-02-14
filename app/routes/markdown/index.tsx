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

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor, format) => {
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

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const MarkButton = ({ format, icon }) => {
  // const editor = useSlate();
  const editor = ""; // to change
  return (
    <ToolButton
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <SvgIcon>{icon}</SvgIcon>
    </ToolButton>
  );
};

export default function Index() {
  return (
    <div className="container bg-slate-100  h-screen pt-32 mx-auto flex justify-center">
      <div className="bg-white w-6/12 h-64 shadow-md rounded-lg divide-y-2 divide-slate-50">
        <div className="h-10 flex  items-center gap-4 pl-1">
          <MarkButton format="bold" icon="format_bold"></MarkButton>
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
        <div className="pl-2.5 pt-2">write something</div>
      </div>
    </div>
  );
}
