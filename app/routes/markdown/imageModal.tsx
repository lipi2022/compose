import React, { useState } from "react";

export default function ImageModal({ show }: { show: boolean }) {
  const [drag, setDrag] = useState(false);
  const dragStyle = drag
    ? "border-2 border-dashed m-4 pt-6 pb-6 border-teal-400"
    : "border-2 border-dashed m-4 pt-6 pb-6";

  const svgStyle = drag
    ? "h-24 w-24 mx-auto fill-teal-400"
    : "h-24 w-24 mx-auto";

  return (
    <div className="container  bg-slate-300 w-screen h-screen mx-auto pt-32">
      <div className="container pt-4 bg-slate-50 w-72 h-[312px]  mx-auto flex flex-col  shadow-md rounded-md ">
        <div
          className={dragStyle}
          onDragEnter={(e) => {
            if (e.preventDefault) {
              e.preventDefault();
              e.persist();
              e.stopPropagation();
            }
            setDrag(true);
            console.log("drag enter");
          }}
          onDragLeave={() => {
            {
              setDrag(false);
              console.log("drag leave");
            }
          }}
          onDragOver={(e) => {
            if (e.preventDefault) {
              e.preventDefault();
              e.persist();
              e.stopPropagation();
            }
            setDrag(true);
            console.log("drag over");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={svgStyle}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            pointerEvents="none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>{" "}
          <div className="text-lg text-center text-gray-600 pointer-events-none">
            {" "}
            Drag and drop or click here
            <br></br>
            <p className="text-sm text-slate-400">to upload image (max 2MiB)</p>
          </div>{" "}
        </div>
        <button className="rounded-md mx-auto mt-2 bg-teal-400 w-48 h-10 text-teal-50">
          submit
        </button>
      </div>
    </div>
  );
}
