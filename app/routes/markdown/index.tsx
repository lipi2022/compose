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

export default function Index() {
  return (
    <div className="container bg-slate-100  h-screen pt-32 mx-auto flex justify-center">
      <div className="bg-white w-6/12 h-64 shadow-md rounded-lg divide-y-2 divide-slate-50">
        <div className="h-10 flex  items-center gap-4 pl-1">
          <div className="hover:bg-slate-300 h-8 w-8 flex items-center justify-center">
            <RiBold size={22} color="gray" title="bold" />
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
