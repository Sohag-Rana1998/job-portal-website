import { Avatar } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth/useAuth";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import { BsCheckLg } from "react-icons/bs";

const Navbar = () => {
  const location = useLocation();
  const { isAdmin } = useAdmin();

  console.log(isAdmin?.role);
  const localTheme = localStorage.getItem("theme");
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localTheme);
  const [type, setType] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const isHomePage = location.pathname === "/";
  const isDashboard = location.pathname.includes("/dashboard");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    if (localTheme == "synthwave") {
      setType(true);
    } else {
      setType(false);
    }
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    setType(!type);

    if (e.target.checked) {
      setTheme("synthwave");
    } else {
      setTheme("light");
    }
  };

  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result);
        Swal.fire({
          icon: "success",
          title: "Log Out successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
    // console.log(user);
  };

  //https://i.postimg.cc/66LCsndF/light.png
  //https://i.postimg.cc/RFxv43cD/dark.png
  const themeButton = (
    <>
      <label className="cursor-pointer grid place-items-center">
        <input
          onChange={handleToggle}
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller h-7 w-14 bg-orange-500 row-start-1 col-start-1 col-span-2"
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

  const dashboardRoute =
    isAdmin?.role === "admin"
      ? { path: "/dashboard/admin-home", title: "Dashboard" }
      : { path: "/dashboard/user-home", title: "Dashboard" };

  const links = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/all-jobs",
      title: "All Jobs",
    },
    dashboardRoute,
    {
      path: "/blogs",
      title: "Blogs",
    },
  ];

  const adminDashboard = [
    {
      path: "/dashboard/admin-home",
      title: "Admin Home",
    },
    {
      path: "/dashboard/add-job",
      title: "Add A Job",
    },
    {
      path: "/dashboard/manage-jobs",
      title: "Manage Jobs",
    },
    {
      path: "/dashboard/manage-users",
      title: "Manage Users",
    },
  ];

  const userDashboard = [
    {
      path: "/dashboard/user-home",
      title: "User Home",
    },
    {
      path: "/dashboard/saved-jobs",
      title: "Saved Jobs",
    },
    {
      path: "/dashboard/applied-jobs",
      title: "Applied Jobs",
    },
    {
      path: "/dashboard/add-review",
      title: "ADD REVIEW",
    },
  ];

  const dashboardLinkForMobile =
    isAdmin?.role === "admin"
      ? [...links, ...adminDashboard]
      : [...links, ...userDashboard];

  const linksForMobile = isDashboard ? dashboardLinkForMobile : links;
  console.log(linksForMobile);
  return (
    <div
      className={` navbar w-full fixed z-50  transition duration-300 ease-in-out ${
        type ? " !text-white bg-[#1A103D]" : "text-black bg-white"
      } ${
        isHomePage
          ? " bg-transparent  !text-black md:text-white"
          : "bg-white  text-black"
      } ${
        isScrolled
          ? "bg-white !text-black"
          : "!bg-transparent !text-black md:text-white"
      }  pt-2 mx-auto   `}
    >
      <div className="navbar-start">
        {/* <div className="dropdown mr-2">
          <div
            tabIndex={0}
            role="button"
            className="btn !bg-opacity-0 border-none  md:hidden"
          >
            <svg
              onClick={() => setMenuToggle(true)}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5`}
              fill="none"
              viewBox="0 0 24 24"
              stroke={`${isScrolled ? "#000" : "#FFF"}`}
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
            className={`menu menu-sm ${
              menuToggle ? "!block" : "!hidden"
            } dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40`}
          >
            {linksForMobile?.map((link) => (
              <li key={link.path} onClick={() => setMenuToggle(false)}>
                <Link
                  to={link?.path}
                  className={`${
                    location.pathname == link.path
                      ? "border-2  font-bold  border-[#ff4153]"
                      : ""
                  } `}
                >
                  {link?.title}
                </Link>
              </li>
            ))}
            <div className="navbar-end mt-2 ">
              <div className=" ">
                {user ? (
                  <div className="">
                    <Avatar
                      title={user?.displayName || ""}
                      src={
                        (user && user?.photoURL) ||
                        "https://i.ibb.co/zmbRY07/images.png"
                      }
                      className="mr-4 mb-2 cursor-pointer bg-no-repeat bg-cover bg-[url(https://i.ibb.co/zmbRY07/images.png)]"
                    />

                    <Link to={"/user-profile"}>
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
                    <Link to={"/login"}>
                      <button className="btn w-32 btn-bg mr-3 text-white ">
                        Log In
                      </button>
                    </Link>
                    <Link to={"/register"}>
                      <button className="btn w-32 btn-bg mr-3 text-white">
                        Register
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </ul>
        </div> */}
        <div className="drawer  w-14  lg:w-0 mr-2 lg:mr-0">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content  w-14  lg:w-0">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn bg-gray-200 !bg-opacity-40 !border-none flex lg:hidden"
            >
              <svg
                onClick={() => setMenuToggle(true)}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5  `}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#000"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul
              className={`menu bg-base-200 text-base-content min-h-full w-48 p-4`}
            >
              {/* Sidebar content here */}

              {linksForMobile?.map((link) => (
                <li key={link.path} onClick={() => setMenuToggle(false)}>
                  <Link
                    to={link?.path}
                    className={`${
                      location.pathname == link.path
                        ? "border-2  font-bold  border-[#ff4153]"
                        : ""
                    } `}
                  >
                    {link?.title}
                  </Link>
                </li>
              ))}
              <div className="navbar-end mt-2 ">
                <div className=" ">
                  {user ? (
                    <div className="">
                      <Avatar
                        title={user?.displayName || ""}
                        src={
                          (user && user?.photoURL) ||
                          "https://i.ibb.co/zmbRY07/images.png"
                        }
                        className="mr-4 mb-2 cursor-pointer bg-no-repeat bg-cover bg-[url(https://i.ibb.co/zmbRY07/images.png)]"
                      />

                      <button
                        onClick={handleLogout}
                        className="btn bg-[#FF4153] mt-2 text-white flex items-center gap-2 justify-center border-none focus:outline-none w-40 hover:bg-gray-950 "
                      >
                        <FiLogOut /> Log Out
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Link to={"/login"}>
                        <button className="btn bg-[#FF4153]  text-white flex items-center gap-2 justify-center border-none focus:outline-none w-40 hover:bg-gray-950 ">
                          {" "}
                          <FiLogIn /> Log In
                        </button>
                      </Link>
                      <Link to={"/register"}>
                        <button
                          className={`btn  mt-2  border-none w-40 text-white bg-gray-950 hover:bg-[#FF4153] flex justify-center items-center gap-2`}
                        >
                          <FaUser /> Register
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div className="flex w-full justify-between items-center ">
          <Link to={"/"}>
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
        <ul className="menu menu-horizontal flex gap-2 px-1">
          {" "}
          {links?.map((link) => (
            <li key={link.path}>
              <Link
                to={link?.path}
                className={`${
                  location.pathname == link.path
                    ? "border-2 bg-none font-bold border-[#ff4153]"
                    : ""
                }   ${
                  isHomePage && !isScrolled ? "!text-white" : "text-black"
                } `}
              >
                {link?.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end hidden  md:flex">
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
                        "https://i.ibb.co/zmbRY07/images.png"
                      }
                      className="mr-4 cursor-pointer bg-no-repeat bg-cover bg-[url(https://i.ibb.co/zmbRY07/images.png)]"
                    />
                    <ul className="dropDown">
                      <div className="w-auto bg-white bg-opacity-50 dropdownMenu duration-500   z-10   rounded-xl p-3   ">
                        <div className="flex flex-col  items-end">
                          <h2 className="w-full bg-[#FF4153] hover:bg-gray-950 r text-white font-bold  p-2 rounded-md mb-2">
                            {user?.displayName || ""}
                          </h2>

                          <button
                            onClick={handleLogout}
                            className="btn bg-[#FF4153] mr-3 text-white flex items-center gap-2 justify-center border-none focus:outline-none w-28 hover:bg-gray-950 "
                          >
                            <FiLogOut /> Log Out
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
              <Link to={"/login"}>
                <button className="btn bg-[#FF4153] mr-3 text-white flex items-center gap-2 justify-center border-none focus:outline-none w-28 hover:bg-gray-950 ">
                  {" "}
                  <FiLogIn /> Log In
                </button>
              </Link>
              <Link to={"/register"}>
                <button
                  className={`btn  mr-3  border-none w-28   flex justify-center items-center gap-2 ${
                    isScrolled
                      ? "bg-gray-900 text-white hover:bg-[#FF4153] "
                      : "bg-white text-black hover:bg-gray-950 hover:text-white"
                  }`}
                >
                  <FaUser /> Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
