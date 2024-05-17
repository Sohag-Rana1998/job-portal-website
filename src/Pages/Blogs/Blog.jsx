import { CardHeader, Typography } from '@material-tailwind/react';
// import { useEffect, useState } from 'react';
import {
  Link,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useBlogsData from '../../Components/Hooks/useBlogsData/useBlogsData';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import toast from 'react-hot-toast';
import axios from 'axios';
const Blog = () => {
  const { data, isLoading, refetch } = useBlogsData();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const startDate = new Date();

  // const [loading, setLoading] = useState(true);
  const handleBlog = async e => {
    e.preventDefault();
    if (!user) return navigate('/login', { state: location.pathname });

    const form = e.target;
    const question1 = form.title.value;
    const image = form.photo.value;
    const answer1 = form.description.value;
    const date = startDate;
    const author = user?.displayName;
    const authorEmail = user?.email;
    const authorImage = user?.photoURL;

    const blogData = {
      image,
      question1,
      answer1,
      date,
      author,
      authorEmail,
      authorImage,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        blogData
      );
      console.log(data);
      toast.success('Your Blog Successfully Posted!');
      form.reset();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

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
    <div className="my-8">
      <Helmet>
        <title>Job Portal || Blogs</title>
      </Helmet>
      <div className="h-32 mb-10  md:h-40 bg-no-repeat bg-center bg-cover w-full rounded-xl flex items-center justify-center bg-[url(https://i.postimg.cc/k4vWHgYk/bg-13.png)] bg-opacity-50 ">
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          Learn More About Programming
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full md:w-[60%] lg:w-[70%]">
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
                      className="w-full rounded-t-2xl  h-60 hover:scale-[105%] duration-700"
                      alt="ui/ux review check"
                    />
                  </div>
                </CardHeader>
                <div className="flex justify-between items-end mb-2 px-3">
                  <div>
                    <img
                      src={
                        blog?.authorImage ||
                        'https://i.ibb.co/zmbRY07/images.png'
                      }
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <h3 className="text-sm font-bold">
                      Author: {blog.author || 'Unknown'}
                    </h3>
                  </div>
                  <div>
                    <div className="text-sm font-bold">
                      Publish Date: {new Date(blog.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="px-3 h-auto  m-0 ">
                  <div className="flex h-full flex-col justify-between">
                    <Typography variant="h6">{blog.question1}</Typography>
                    <Typography variant="h6">{blog.question2 || ''}</Typography>
                    <div>
                      <p>{blog.answer1?.substring(0, 150)}...</p>
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
        <div className="w-full md:w-[35%] lg:w-[25%]">
          <div className="w-full  border rounded-2xl shadow-md p-5  ">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Post A Blog :
            </h3>
            <form onSubmit={handleBlog} className="">
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Blog Title
                </label>
                <input
                  id="name"
                  name="title"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className=" " htmlFor="photo">
                  Photo URL
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>

              <div className="mb-5">
                <label className=" " htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  rows="5"
                  required
                  placeholder="description"
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

export default Blog;
