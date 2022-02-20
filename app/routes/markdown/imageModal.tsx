import React, { useState } from "react";

export default function ImageModal({ show }: { show: boolean }) {
  const [drag, setDrag] = useState(false); // if enter drag div
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imgVisible, setImgVisible] = useState(false);
  const [svgVisible, setSvgVisible] = useState(true);

  const dragStyle = drag
    ? "border-2 border-dashed m-4 pt-6 pb-6 border-teal-400"
    : "border-2 border-dashed m-4 pt-6 pb-6";

  const svgStyle = drag
    ? "h-24 w-24 mx-auto fill-teal-400"
    : "h-24 w-24 mx-auto";

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("on drop");
    console.log(e.dataTransfer.files[0]);
    let f: File = e.dataTransfer.files[0];
    setImage(f);
    setImgVisible(true);
    setSvgVisible(false);
    setPreviewUrl(URL.createObjectURL(f));
  };

  return (
    <div className="container pt-4 bg-slate-50 max-w-lg min-h-96 mx-auto flex flex-col  shadow-md rounded-md ">
      <div
        className={dragStyle}
        onDragEnter={(e) => {
          e.preventDefault();
          e.persist();
          e.stopPropagation();
          setDrag(true);
        }}
        onDragLeave={() => {
          {
            setDrag(false);
            console.log("drag leave");
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.persist();
          e.stopPropagation();
          setDrag(true);
        }}
        onDrop={handleDrop}
      >
        {svgVisible ? (
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
          </svg>
        ) : null}
        {imgVisible ? (
          <img className="animate-pulse" src={previewUrl}></img>
        ) : null}
        <div className="text-lg text-center text-gray-600 pointer-events-none">
          {" "}
          Drag and drop or click here
          <br></br>
          <p className="text-sm text-slate-400">to upload image (max 5MiB)</p>
        </div>{" "}
      </div>
      <div className="flex flex-row">
        <button
          className="rounded-md mx-auto mb-4 bg-slate-200 w-48 h-10 text-slate-800"
          onClick={() => {
            setSvgVisible(true);
            setImgVisible(false);
            setDrag(false);
          }}
        >
          reset
        </button>
        <button className="rounded-md mx-auto mb-4 bg-teal-400 w-48 h-10 text-teal-50">
          upload
        </button>
      </div>
    </div>
  );
}
