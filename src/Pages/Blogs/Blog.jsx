import { CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, ScrollRestoration } from 'react-router-dom';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';

const Blog = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const myBlogsData = async () => {
      try {
        const { data } = await axiosSecure.get(`/blogs`);
        console.log(data);
        setBlogs(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    myBlogsData();
  }, [axiosSecure]);
  console.log(blogs);
  return loading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div>
      <div className="h-32 mb-10 md:h-40 bg-no-repeat bg-center bg-cover w-full rounded-xl flex items-center justify-center bg-[url(https://i.postimg.cc/k4vWHgYk/bg-13.png)] bg-opacity-50 ">
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          Learn More About Programming
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {blogs?.map(blog => (
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
