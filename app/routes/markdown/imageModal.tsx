import React, { useState } from "react";

export default function ImageModal({ show }: { show: boolean }) {
  return (
    <div className="container  bg-slate-300 w-screen h-screen mx-auto pt-32">
      <div className="container pt-8 bg-slate-50 w-72 h-[288px]  mx-auto flex flex-col  shadow-md rounded-md ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mx-auto pt-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>{" "}
        <p className="text-xl text-center text-gray-600">
          {" "}
          Drag and drop or click here
          <br></br>
          <div className="text-sm text-slate-400">
            to upload image (max 2MiB)
          </div>
          <button className="rounded-md  mt-8 bg-teal-400 w-48 h-10 text-teal-50">
            submit
          </button>
        </p>
      </div>
    </div>
  );
}
