import { Avatar } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Swal from 'sweetalert2';
import useAuth from '../../../../../../../../job-portal-asign-11/client/src/Components/Hooks/useAuth/useAuth';

const Navbar = () => {
  const localTheme = localStorage.getItem('theme');
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localTheme);
  const [type, setType] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    if (localTheme == 'synthwave') {
      setType(true);
    } else {
      setType(false);
    }
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);

  const handleToggle = e => {
    setType(!type);

    if (e.target.checked) {
      setTheme('synthwave');
    } else {
      setTheme('light');
    }
  };

  const handleLogout = () => {
    logOut()
      .then(result => {
        console.log(result);
        Swal.fire({
          icon: 'success',
          title: 'Log Out successful',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(error => {
        console.error(error.message);
      });
    // console.log(user);
  };

  //https://i.postimg.cc/66LCsndF/light.png
  //https://i.postimg.cc/RFxv43cD/dark.png
  const themeButton = (
    <>
      {/* <a className=" h-12  w-12 bg-black rounded-full">
        <img
          className="w-full h-full p-1"
          src="https://i.postimg.cc/66LCsndF/light.png"
          alt=""
        />
      </a> */}
      <label className="cursor-pointer grid place-items-center">
        <input
          onChange={handleToggle}
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller h-7 md:h-8 w-16 bg-orange-500 row-start-1 col-start-1 col-span-2"
          checked={type}
        />
        <svg
          className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <svg
          className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </>
  );

  const Links = (
    <div className="flex flex-col   lg:flex-row gap-2">
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isActive
              ? 'border-2 font-bold   border-[#ff4153]'
              : isPending
              ? 'pending'
              : ''
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-jobs"
          className={({ isActive, isPending }) =>
            isActive
              ? 'border-2 font-bold    border-[#ff4153]'
              : isPending
              ? 'pending'
              : ''
          }
        >
          All Jobs
        </NavLink>
      </li>
      {user ? (
        <>
          {' '}
          <li>
            <NavLink
              to="/applied-jobs"
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 font-bold   border-[#ff4153]'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              Applied Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-jobs"
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 font-bold   border-[#ff4153]'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              Add A Job
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-jobs"
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 font-bold   border-[#ff4153]'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              My Jobs
            </NavLink>
          </li>
        </>
      ) : (
        <></>
      )}
      <li>
        <NavLink
          to="/blogs"
          className={({ isActive, isPending }) =>
            isActive
              ? 'border-2 font-bold   border-[#ff4153]'
              : isPending
              ? 'pending'
              : ''
          }
        >
          Blogs
        </NavLink>
      </li>
    </div>
  );

  return (
    <div
      className={
        type
          ? 'navbar fixed z-50 text-white container pt-2 mx-auto bg-[#1a103d] '
          : 'navbar fixed z-50 text-black container pt-2 mx-auto  bg-[#F1F1F2]'
      }
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
          >
            {Links}
            <div className="navbar-end mt-2 ">
              <div className=" ">
                {user ? (
                  <div className="">
                    <Avatar
                      title={user?.displayName || ''}
                      src={
                        (user && user?.photoURL) ||
                        'https://i.ibb.co/zmbRY07/images.png'
                      }
                      className="mr-4 mb-2 cursor-pointer bg-no-repeat bg-cover bg-[url(https://i.ibb.co/zmbRY07/images.png)]"
                    />

                    <Link to={'/user-profile'}>
                      <button className="btn w-32  bg-blue-600 hover:bg-blue-gray-900   text-white">
                        User Profile
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn w-32  bg-blue-600 hover:bg-blue-gray-900   text-white"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div>
                    <Link to={'/login'}>
                      <button className="btn w-32 btn-bg mr-3 text-white">
                        Log In
                      </button>
                    </Link>
                    <Link to={'/register'}>
                      <button className="btn w-32 btn-bg mr-3 text-white">
                        Register
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </ul>
        </div>
        <div className="flex w-full justify-between items-center ">
          <Link to={'/'}>
            <div className="self-center cursor-pointer hover:scale-[105%] duration-700 w-28 h-8 font-semibold">
              <img
                className="w-full h-full"
                src="https://i.postimg.cc/jSxrQLVG/Logo.png"
                alt=""
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="flex md:hidden justify-end items-center w-full mx-5">
        <div className="block md:hidden ">{themeButton}</div>
      </div>

      <div className="navbar-center hidden  lg:flex">
        <ul className="menu menu-horizontal px-1"> {Links}</ul>
      </div>

      <div className="navbar-end hidden md:flex lg:flex">
        <div className="flex  ">
          {user ? (
            <div className="flex gap-3 justify-between items-center">
              {themeButton}
              <nav className="relative parent ">
                <ul className="flex items-start gap-2">
                  <li>
                    <Avatar
                      src={
                        (user && user?.photoURL) ||
                        'https://i.ibb.co/zmbRY07/images.png'
                      }
                      className="mr-4 cursor-pointer bg-no-repeat bg-cover bg-[url(https://i.ibb.co/zmbRY07/images.png)]"
                    />
                    <ul className="dropDown">
                      <div className="w-auto bg-[#006740] bg-opacity-50 dropdownMenu duration-500   z-10   rounded-xl p-3   ">
                        <div className="flex flex-col  items-end">
                          <h2 className="w-full hover:bg-blue-500 bg-gray-500 text-white font-bold  p-2 rounded-md mb-2">
                            {user?.displayName || ''}
                          </h2>
                          <Link to={'/user-profile'}>
                            <button className="btn  hover:bg-blue-500 mb-2 bg-gray-500 text-white">
                              User Profile
                            </button>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="btn hover:bg-blue-500 bg-gray-500 text-white"
                          >
                            Log Out
                          </button>
                        </div>
                      </div>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {themeButton}
              <Link to={'/login'}>
                <button className="btn btn-bg mr-3 text-white">Log In</button>
              </Link>
              <Link to={'/register'}>
                <button className="btn btn-bg mr-3 text-white">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
