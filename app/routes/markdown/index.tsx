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

import Compose from "./compose";

export default function Index() {
  return (
    <div className="bg-slate-100">
      <div className="container h-screen pt-32 mx-auto flex justify-center">
        <Compose></Compose>
      </div>
    </div>
  );
}
