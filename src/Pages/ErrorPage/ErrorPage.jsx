/* eslint-disable react/no-unknown-property */

import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center  min-h-screen">
      <div className="w-[80%]  h-[500px] px-10 flex items-center justify-center">
        <img
          className="w-full  h-full rounded-lg"
          src="https://i.postimg.cc/Qt4x0ZNs/page-not-found-404-1.gif"
          alt=""
        />
      </div>
      <div className="flex justify-center w-full my-10">
        <Link to={'/'}>
          <button className="btn bg-black hover:bg-gray-400 text-white ">
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
