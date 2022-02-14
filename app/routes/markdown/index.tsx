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
    <div className="bg-slate-200 h-screen flex justify-center pt-32">
      <div className="bg-white w-3/5 h-64 shadow-md rounded-md">
        <div className="grid grid-cols-1 ">
          <div className="bg-slate-100 h-12 flex justify-center">
            <div className="grid grid-cols-9 divide-x justify-center h-full w-full">
              <div className="place-content-center">
                <IconContext.Provider
                  value={{
                    color: "color",
                    className: "",
                  }}
                >
                  <div>
                    <RiBold />
                  </div>
                </IconContext.Provider>
              </div>
              <div className="text-center">bold</div>
              <div>italic</div>
              <div>code</div>
              <div>blockquote</div>
              <div>ul</div>
              <div>ol</div>
              <div>image</div>
              <div>save</div>
            </div>
          </div>
          <div className="white h-full"></div>
        </div>
      </div>
    </div>
  );
}
