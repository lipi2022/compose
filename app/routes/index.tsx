import { Link } from "remix";
import heroshot from "../res/heroshot.png";

export default function Index() {
  return (
    <div
      id="landing-main"
      className="container  mx-auto box-border overflow-x-hidden"
    >
      <div id="landing-header" className="flex p-4">
        <Link
          to="/"
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-pink-600"
        >
          excerpt
        </Link>
        <div className="flex flex-grow items-center content-center pr-2"></div>
        <div className="flex items-center ">login</div>
      </div>
      <div
        id="hero-section"
        className="flex flex-col items-center p-10 box-sizeing mb-4 border-b-0"
      >
        <div
          id="hero-header"
          className="text-4xl  text-center mb-1 text-black font-bold"
        >
          <p>
            <a className="text-teal-500">excerpt</a> all notes to{" "}
            <a className="text-teal-500">one</a> place
          </p>
        </div>
        <div className="text-slate-400 p-2 pb-4">
          Organiz your notes and pictures in a way where people can find them
        </div>
        <button className="rounded-md mb-4 bg-teal-500 w-36 h-10 text-teal-50">
          Get started
        </button>
        <img className="pt-6" src={heroshot}></img>
      </div>
    </div>
  );
}
