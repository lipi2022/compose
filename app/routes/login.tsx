export default function Login() {
  return (
    <div className="bg-gray-300">
      <div className="container h-screen flex justify-center items-center">
        <div className="p-8 bg-white rounded-lg max-w-6xl pb-10">
          <div className="flex justify-center mb-4">
            <img src="https://i.imgur.com/f6Tb5U1.png" width="70" />
          </div>
          <input
            type="text"
            className="h-12 rounded w-full border px-3 focus:text-black focus:border-blue-100"
            placeholder="Email"
          />
          <input
            type="text"
            className="h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100"
            placeholder="Password"
          />
          <div className="flex justify-end items-center mt-2">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              Forgot password?
            </a>
          </div>
          <button className="uppercase h-12 mt-3 text-white w-full rounded bg-red-700 hover:bg-red-800">
            login
          </button>
          <div className="flex justify-between items-center mt-3">
            <hr className="w-full" />
            <span className="p-2 text-gray-400 mb-1">OR</span>
            <hr className="w-full" />
          </div>
          <button className="uppercase h-12 mt-3 text-white w-full rounded bg-blue-800 hover:bg-blue-900">
            <i className="fa fa-facebook mr-2"></i>Facebook
          </button>
          <button className="uppercase h-12 mt-3 text-white w-full rounded bg-red-800 hover:bg-red-900">
            <i className="fa fa-google mr-2"></i>Google
          </button>
        </div>
      </div>
    </div>
  );
}
