import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Swal from 'sweetalert2';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import toast from 'react-hot-toast';
import useAuth from '../../Components/Hooks/useAuth/useAuth';

const Register = () => {
  const [type, setType] = useState(false);
  const {
    createUserByEmailAndPassword,
    signInWithGoogle,
    handleUpdateProfile,
  } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!/[A-Z]/.test(password)) {
      toast.error('Your Password Should Have One Uppercase Letter.');
      return;
    } else if (!/[a-z]/.test(password)) {
      toast.error('Your Password Should Have One Lowercase Letter.');

      return;
    } else if (password.length < 6) {
      toast.error('Password Must Be Minimum 06 Character.');

      return;
    }
    // console.log(name, email, photo, password);

    createUserByEmailAndPassword(email, password)
      .then(() => {
        handleUpdateProfile(name, photo);

        navigate('/');

        Swal.fire({
          icon: 'success',
          title: 'Congratulation! Your account is registered successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(error => {
        console.error(error.message);
        Swal.fire({
          icon: 'error',
          title: error.message,
          showConfirmButton: true,
          timer: 2000,
        });
      });
  };

  const navigate = useNavigate();
  // console.log(navigate);
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        // console.log(result.user);
        navigate('/');
        Swal.fire({
          icon: 'success',
          title: 'Log In successful',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong. Please try again.',
          showConfirmButton: true,
        });
      });
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(setLoading, 500, false);
  }, []);

  return loading ? (
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
    <div className="text-white relative flex flex-col   bg-[#00523f]">
      <Helmet>
        <title>Adventure Travel | Register</title>
      </Helmet>
      <div className="w-full  flex justify-between">
        <div className="w-full md:w-[45%] my-14 h-full px-5 mx-auto md:mx-0 flex flex-col justify-center items-center">
          <div className=" w-60 mb-5">
            <img
              className="h-full w-full "
              src="https://i.postimg.cc/zvPQTYpS/avatar-with-man-in-green-shirt-and-orange-hat.png"
              alt=""
            />
          </div>
          <div className=" w-[50%] mb-8">
            <img src="https://i.postimg.cc/tCZS8f2w/WELCOME.png" alt="" />
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 font-bold text-sm"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Your Name"
                    className="w-full mb-3  py-2 border-b-2  border-white bg-[#00523f] "
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 font-bold text-sm"
                  >
                    Your Photo URL
                  </label>
                  <input
                    type="text"
                    name="photo"
                    id="photo"
                    required
                    placeholder="Your Photo URL"
                    className="w-full mb-3  py-2 border-b-2  border-white bg-[#00523f]  "
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-bold text-sm"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    id="email"
                    placeholder="Email address"
                    className="w-full mb-3  py-2 border-b-2  border-white bg-[#00523f] "
                  />{' '}
                </div>
                <div>
                  <div className="flex  justify-between mb-2">
                    <label htmlFor="password" className="text-sm font-bold">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={type ? 'text' : 'password'}
                      name="password"
                      id="password"
                      required
                      placeholder="password"
                      className="w-full mb-3  py-2 border-b-2  border-white bg-[#00523f] "
                    />
                    <span
                      className="absolute right-5 top-2 "
                      onClick={() => setType(!type)}
                    >
                      {type ? (
                        <IoEye className="text-2xl" />
                      ) : (
                        <IoEyeOff className="text-2xl" />
                      )}
                    </span>{' '}
                  </div>
                  <div className="flex justify-end">
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="text-xs hover:underline "
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <input
                    type="submit"
                    value="Register"
                    className="w-full px-8 py-3 font-semibold cursor-pointer rounded-md bg-blue-600 text-gray-50"
                  />
                </div>
                <p className="px-6 text-sm text-center ">
                  Already have an account yet?
                  <Link to={'/login'}>
                    {' '}
                    <button className="hover:underline cursor-pointer font-bold text-xl text-blue-600">
                      Log In
                    </button>
                  </Link>
                </p>
              </div>
            </form>
            <div className="flex border-white justify-around items-center ">
              <div className="divider divider-success   w-full"></div>
              <h2>OR</h2>
              <div className="divider divider-success   w-full"></div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={handleGoogleLogin}
                size="lg"
                variant="outlined"
                color="blue-gray"
                className="flex items-center w-full gap-3 text-white"
              >
                <img
                  src="https://docs.material-tailwind.com/icons/google.svg"
                  alt="metamask"
                  className="h-6 w-6"
                />
                Continue with Google
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col">
          <div className="w-32 h-[150px] absolute top-0 right-80">
            <img
              className="h-full w-full"
              src="https://i.postimg.cc/kgPcz5VR/chandelier-with-green-round-lampshade.png"
              alt=""
            />
          </div>
          <div className="h-[300px] w-[250px] absolute top-[30%] right-[22%]">
            <img
              className="h-full w-full"
              src="https://i.postimg.cc/6pTMCPGY/Rectangle.png"
              alt=""
            />
          </div>
          <div className="w-full h-full">
            <img
              className="h-full"
              src="https://i.postimg.cc/kgypySjg/Rectangle-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
