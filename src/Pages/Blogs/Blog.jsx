import { CardHeader, Typography } from '@material-tailwind/react';
// import { useEffect, useState } from 'react';
import { Link, ScrollRestoration } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useBlogsData from '../../Components/Hooks/useBlogsData/useBlogsData';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
const Blog = () => {
  const { user } = useAuth();
  // const [loading, setLoading] = useState(true);

  const { data, isLoading } = useBlogsData();

  //   const myBlogsData = async () => {
  //     try {
  //       const { data } = await axiosSecure.get(`/blogs`);
  //       console.log(data);
  //       setBlogs(data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   myBlogsData();
  // }, [axiosSecure]);
  // console.log(blogs);
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
    <div>
      <Helmet>
        <title>Job Portal || Blogs</title>
      </Helmet>
      <div className="h-32 mb-10 md:h-40 bg-no-repeat bg-center bg-cover w-full rounded-xl flex items-center justify-center bg-[url(https://i.postimg.cc/k4vWHgYk/bg-13.png)] bg-opacity-50 ">
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          Learn More About Programming
        </h1>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          {data?.map(blog => (
            <div key={blog._id}>
              <div className="w-full  h-full  rounded-2xl shadow-2xl  overflow-hidden">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-0 rounded-none"
                >
                  <div>
                    <img
                      src={blog.image}
                      className="w-full rounded-t-2xl  h-80 hover:scale-[105%] duration-700"
                      alt="ui/ux review check"
                    />
                  </div>
                </CardHeader>
                <div className="flex justify-between items-center mb-1 px-4">
                  <div>
                    <h3 className="text-sm font-bold">Author: {blog.author}</h3>
                  </div>
                  <div>
                    <div className="text-sm font-bold">
                      Publish Date:{blog.date}
                    </div>
                  </div>
                </div>
                <div className="px-3 h-auto  m-0 ">
                  <div className="flex h-full flex-col justify-between">
                    <Typography variant="h6">{blog.question1}</Typography>
                    <Typography variant="h6">{blog.question2}</Typography>
                    <div>
                      <p>{blog.answer1.substring(0, 150)}...</p>
                    </div>
                    <div className="flex justify-end mt-1 px-4 mb-3">
                      <div></div>
                      <Link to={`/blog/${blog._id}`}>
                        <button className=" mb-2  hover:scale-[110%] duration-500  md:w-auto text-black font-bold">
                          <a className="font-bold text-xl underline ">
                            {' '}
                            Read More
                          </a>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="w-full  lg:w-[27%] border rounded-2xl shadow-md p-5  ">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Contact With Employer:
            </h3>
            <form className="">
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  defaultValue={user?.displayName}
                  type="text"
                  disabled
                  className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Your Email
                </label>
                <input
                  id="name"
                  name="name"
                  disabled
                  defaultValue={user?.email}
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className="" htmlFor="name">
                  Phone
                </label>
                <input
                  id="name"
                  name="phone"
                  type="number"
                  placeholder="Phone Number"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Subject
                </label>
                <input
                  id="name"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Message
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
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Blog;
