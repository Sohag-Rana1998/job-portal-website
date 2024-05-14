import { Link, useLocation, useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button } from '@material-tailwind/react';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

import Swal from 'sweetalert2';

import useAuth from '../../Components/Hooks/useAuth/useAuth';

const Login = () => {
  const [type, setType] = useState(false);
  const { signInWithEmail, signInWithGoogle } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const handleLogIn = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    signInWithEmail(email, password)
      .then(() => {
        // console.log(result.user);

        Swal.fire({
          icon: 'success',
          title: 'Log In successful',
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(location?.state || '/');
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title:
            'Something went wrong. Please provide a registered email and password.',
          showConfirmButton: true,
        });
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        // console.log(result.user);

        navigate(location?.state || '/');
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
          title:
            'Something went wrong. Please provide a registered email and password.',
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
        <title>Job Portal | Login</title>
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
            <form
              onSubmit={handleLogIn}
              noValidate=""
              action=""
              className="space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block font-bold mb-2 text-sm"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Email"
                    className="w-full mb-3  py-2 border-b-2  border-white bg-[#00523f] "
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm font-bold">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={type ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="password"
                      className="w-full  py-2 border-b-2  border-white bg-[#00523f] "
                      required
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
                    value="Log In"
                    className="w-full px-8 py-3 cursor-pointer font-semibold rounded-md bg-[#FFC42A] text-[#00523f]"
                  />
                </div>
                <p className="px-6 text-sm text-center">
                  Don&apos;t have an account yet?
                  <Link to={'/register'}>
                    <button
                      rel="noopener noreferrer"
                      href="#"
                      className="hover:underline cursor-pointer font-bold text-xl "
                    >
                      Sign up
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

export default Login;
