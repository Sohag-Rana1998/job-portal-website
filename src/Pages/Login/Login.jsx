import {
  Link,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router-dom';

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
    <div className="w-full min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="flex flex-col  justify-between items-center ">
      <Helmet>
        <title>Jop Portal || Login</title>
      </Helmet>
      <div className="flex flex-col max-w-lg container p-5 md:p-20 rounded-md   bg-slate-100 border-2 mb-5 shadow-xl border-purple-200 text-gray-800">
        <div className="mb-4 text-center">
          <h1 className="my-3 text-4xl font-bold">Log in</h1>
          <p className="text-sm dark:text-gray-600">
            Log in to access your account
          </p>
        </div>
        <form
          onSubmit={handleLogIn}
          noValidate=""
          action=""
          className="space-y-6"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-bold mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder=" Email address"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm font-bold">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline text-gray-600"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={type ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="password"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
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
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <input
                type="submit"
                value="Log In"
                className="w-full px-8 py-3 cursor-pointer font-semibold rounded-md bg-blue-600 text-gray-50"
              />
            </div>
            <p className="px-6 text-sm text-center text-gray-600">
              Don&apos;t have an account yet?
              <Link to={'/register'}>
                <button
                  rel="noopener noreferrer"
                  href="#"
                  className="hover:underline cursor-pointer font-bold text-xl text-violet-600"
                >
                  Sign up
                </button>
              </Link>
              .
            </p>
          </div>
        </form>
        <div className="flex justify-around items-center ">
          <div className="divider divider-primary   w-full"></div>
          <h2>OR</h2>
          <div className="divider divider-primary  w-full"></div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={handleGoogleLogin}
            size="lg"
            variant="outlined"
            color="blue-gray"
            className="flex items-center w-full gap-3"
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
      <ScrollRestoration />
    </div>
  );
};

export default Login;
