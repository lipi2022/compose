import { Link } from "remix";

export default function Index() {
  return (
    <div id="main" className="container bg-teal-200 w-screen h-full ">
      <div id="menu" className="bg-slate-200 flex w-screen p-4">
        <Link
          to="/"
          className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-pink-600"
        >
          excerpt
        </Link>
        <div className="flex flex-grow items-center content-center pr-2"></div>
        <div className="flex items-center ">login</div>
      </div>
    </div>
  );
}
