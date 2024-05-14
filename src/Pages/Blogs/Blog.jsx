import { CardBody, CardHeader, Typography } from '@material-tailwind/react';
// import { useEffect, useState } from 'react';
import { Link, ScrollRestoration } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useBlogsData from '../../Components/Hooks/useBlogsData/useBlogsData';
import { Helmet } from 'react-helmet-async';
const Blog = () => {
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
              <div className="flex justify-between items-center mb-2 px-4">
                <div>
                  <h3 className="text-xl font-bold">Author: {blog.author}</h3>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    Publish Date:{blog.date}
                  </div>
                </div>
              </div>
              <CardBody className="px-3 h-auto  m-0 ">
                <div className="flex h-full flex-col justify-between">
                  <Typography variant="h5">{blog.question1}</Typography>
                  <Typography variant="h5">{blog.question2}</Typography>

                  <div className="flex justify-end mt-3">
                    <Link to={`/blog/${blog._id}`}>
                      <button className="bg-blue-600 btn mb-2  hover:scale-[110%] duration-500  md:w-auto text-white font-bold hover:bg-blue-gray-900">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </CardBody>
            </div>
          </div>
        ))}
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Blog;
