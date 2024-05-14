import { Typography } from '@material-tailwind/react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollRestoration, useParams } from 'react-router-dom';

import useBlogDataByID from '../../Components/Hooks/useBlogDataByID/useBlogDataByID';
import toast from 'react-hot-toast';

const BlogDetails = () => {
  const { id } = useParams();
  // const [loading, setLoading] = useState(true);

  const { data, isLoading } = useBlogDataByID(id);
  const handleblog = e => {
    e.preventDefault();
    toast.success('Sorry This feature is not available right now.');
  };
  const { image, question1, question2, answer1, answer2, date, author } =
    data || {};
  console.log(data);
  return isLoading ? (
    <div className="w-[80%] mx-auto min-h-screen ">
      <SkeletonTheme baseColor="#a2a2b2">
        <div>
          <div className="mt-10 mb-5">
            <Skeleton height={150} />
          </div>

          <Skeleton height={30} count={10} />
        </div>
      </SkeletonTheme>
    </div>
  ) : (
    <div className="my-8 w-full mx-auto">
      <Helmet>
        <title>Blog | Details </title>
      </Helmet>

      <div className="h-32 mb-10 md:h-40 bg-no-repeat bg-center bg-cover w-full rounded-xl flex flex-col items-center justify-center bg-[url(https://i.postimg.cc/k4vWHgYk/bg-13.png)] bg-opacity-50 ">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-5">
          Know Details
        </h1>
        <div>
          <h3 className="font-bold text-white">Home/Blog Details</h3>
        </div>
      </div>

      <div className="flex w-full flex-col md:flex-row justify-between gap-5">
        <div className="h-auto w-full md:w-[70%] mx-auto">
          <div className="">
            <div color="transparent" className="m-0 w-full p-0 rounded-none">
              <div className="relative overflow-hidden  h-[450px] mb-2">
                <img
                  src={image}
                  className="w-full rounded-2xl  h-full hover:scale-[105%] duration-700"
                  alt="ui/ux review check"
                />
              </div>
            </div>

            <div className="flex w-full flex-col  justify-between h-auto  ">
              <div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-xl font-bold">Author: {author}</h3>
                    </div>
                    <div>
                      <div className="text-xl font-bold">
                        Publish Date:{date}
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <Typography className="text-2xl font-bold">
                      Question No.1: {question1}
                    </Typography>
                    <Typography variant="lead" className="text-lg mt-2">
                      <span className="font-bold">Answer: </span>
                      {answer1}
                    </Typography>
                  </div>
                  <div className="mb-5">
                    <Typography className="text-2xl font-bold">
                      Question No.1: {question2}
                    </Typography>
                    <Typography variant="lead" className="text-lg mt-2">
                      <span className="font-bold">Answer: </span>
                      {answer2}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[25%]">
          <div className="w-full  border rounded-2xl shadow-md p-5  ">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Post A Blog :
            </h3>
            <form onSubmit={handleblog} className="">
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Blog Title
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Photo URL
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>

              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Description
                </label>
                <textarea
                  id="name"
                  name="message"
                  type="text"
                  rows="5"
                  placeholder="Message"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                ></textarea>
              </div>
              <button className="btn rounded-3xl w-full bg-gray-900 text-white hover:bg-[#FF4153]">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default BlogDetails;
