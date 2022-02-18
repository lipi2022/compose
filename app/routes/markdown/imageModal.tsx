import React, { useState } from "react";

export default function ImageModal({ show }: { show: boolean }) {
  return (
    <div className="container  bg-slate-300 w-screen h-screen mx-auto pt-32">
      <div className="container  bg-slate-50 w-96 h-[388px]  mx-auto flex flex-col pt-3 justify-center shadow-md rounded-md ">
        <p className="text-xl text-gray-600"> select image</p>
        <img src="http://34.110.222.91/drag-and-drop.svg"></img>
      </div>
    </div>
  );
}
