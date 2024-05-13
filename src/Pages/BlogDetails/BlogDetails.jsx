import { Typography } from '@material-tailwind/react';

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { ScrollRestoration, useParams } from 'react-router-dom';

import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';

const BlogDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});

  useEffect(() => {
    axiosSecure.get(`/blog/${id}`).then(data => {
      setBlog(data.data);
      setLoading(false);
    });
    setLoading(false);
  }, [id, axiosSecure]);

  const { image, question1, question2, answer1, answer2, date, author } = blog;

  return loading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
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

      <div className="h-auto w-[70%] mx-auto">
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
                    <div className="text-xl font-bold">Publish Date:{date}</div>
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
      <ScrollRestoration />
    </div>
  );
};

export default BlogDetails;
