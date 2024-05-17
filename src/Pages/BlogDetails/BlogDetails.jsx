import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Helmet } from 'react-helmet-async';
import {
  ScrollRestoration,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import useBlogDataByID from '../../Components/Hooks/useBlogDataByID/useBlogDataByID';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import useCommentDataByID from '../../Components/Hooks/useCommentDataByID/useCommentDataByID';

const BlogDetails = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useBlogDataByID(id);
  const { commentsData, refetch1 } = useCommentDataByID(data?._id);
  setTimeout(refetch1, 500);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const startDate = new Date().toLocaleDateString();

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

  const handleComment = async e => {
    e.preventDefault();
    const commentId = id;
    const nameOfCommenter = e.target.name.value;
    const emailOfCommenter = user?.email;
    const commentText = e.target.comment.value;

    const comment = {
      name: nameOfCommenter,
      email: emailOfCommenter,
      commentText,
      commentId,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments`,
        comment
      );
      console.log(data);
      toast.success('Your Comment Successfully Submitted!');
      e.target.reset();
      refetch1();
    } catch (err) {
      console.log(err);
    }
  };

  const {
    image,
    question1,
    question2,
    answer1,
    answer2,
    date,
    author,
    authorImage,
  } = data || {};

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
                      <img
                        src={
                          authorImage || 'https://i.ibb.co/zmbRY07/images.png'
                        }
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                      <h3 className="font-bold">Author: {author}</h3>
                    </div>
                    <div>
                      <div className="font-bold">
                        Publish Date: {new Date(date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="text-2xl font-bold">{question1}</div>
                    <div className="text-lg mt-2">{answer1 || ''}</div>
                  </div>
                  <div className="mb-5">
                    <div className="text-2xl font-bold">{question2}</div>
                    <div className="text-lg mt-2">{answer2 || ''}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[25%] hidden md:block">
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

      <div className="w-full md:w-[70%]">
        {commentsData && commentsData?.length > 0 ? (
          <div className="border shadow-md p-5">
            <h1 className="text-xl font-bold underline mb-5"> Comments:</h1>
            {commentsData.map(comment => (
              <div key={comment._id} className="mb-4 bg-gray-100 px-5 py-2">
                <div>
                  <h3 className="text-xl font-bold">{comment.name}</h3>
                  <p>{comment.commentText}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full md:w-[70%] border rounded-md mt-5 p-5 shadow-md">
        <h3 className="text-2xl font-bold ">Leave a Comment:</h3>
        <div>
          <form onSubmit={handleComment} className="">
            <div className="mb-5">
              <label className=" " htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user?.displayName}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div className="mb-5">
              <label className="font-bold" htmlFor="comment">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                type="text"
                rows="5"
                required
                placeholder="comment"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              ></textarea>
            </div>
            <div className="w-full flex justify-end">
              <button className="btn rounded-3xl w-full md:w-40 bg-gray-900 text-white hover:bg-[#FF4153]">
                Submit Comment
              </button>
            </div>
          </form>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default BlogDetails;
