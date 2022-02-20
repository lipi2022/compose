import ImageModal from "./markdown/imageModal";

export default function Index() {
  return (
    <div className="container  bg-slate-300 w-screen h-screen mx-auto pt-32">
      <ImageModal show={true} />
    </div>
  );
}
