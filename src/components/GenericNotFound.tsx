import { useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import NotFound from "../assets/animated/NotFound.json";
import { paths } from "../paths";

const GenericNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-row text-center items-center">
      <div className="basis-6/12">
        <h1 className="text-8xl text-slate-600 font-semibold">404</h1>
        <div className="text-slate-400">Oops! Sorry page does not found</div>
        <button
          className="mt-10 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        <button
          className="mt-10 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => navigate(paths.home)}
        >
          Go Home
        </button>
      </div>
      <div className="basis-6/12">
        <Lottie animationData={NotFound} loop autoplay />
      </div>
    </div>
  );
};

export default GenericNotFound;
