import { FaAd, FaHome, FaSave } from "react-icons/fa";
import {
  FaAddressCard,
  FaCalendar,
  FaList,
  FaPeopleGroup,
  FaReadme,
} from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Components/Hooks/useAdmin/useAdmin";

const Dashboard = () => {
  const { isAdmin } = useAdmin();

  return (
    <div className="flex w-full items-stretch h-auto  mx-auto">
      <div className=" hidden md:block md:w-52 lg:w-60 bg-[#7ad3da] text-black ">
        <div className="flex justify-center p-4">
          <Link to={"/"}>
            <div className="">
              <h3 className="text-2xl font-extrabold">
                Job <span className="text-[#ff4153]">Portal</span>
              </h3>
            </div>
          </Link>
        </div>
        <ul className="menu px-3 mt-0">
          {isAdmin?.role == "admin" ? (
            <>
              <li className="mb-3">
                <NavLink
                  to={"/dashboard/admin-home"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "border-2 w-full bg-gray-400 font-bold text-white"
                      : isPending
                      ? "pending"
                      : ""
                  }
                >
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>

              <li className="mb-3">
                <NavLink
                  to={"/dashboard/add-job"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "border-2 w-full bg-gray-400 font-bold text-white"
                      : isPending
                      ? "pending"
                      : ""
                  }
                >
                  <FaAddressCard />
                  Add A Job
                </NavLink>
              </li>
              <li className="mb-3">
                <NavLink
                  to={"/dashboard/manage-jobs"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "border-2 w-full bg-gray-400 font-bold text-white"
                      : isPending
                      ? "pending"
                      : ""
                  }
                >
                  <FaList />
                  Manage Jobs
                </NavLink>
              </li>

              <li className="mb-3">
                <NavLink
                  to={"/dashboard/manage-users"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "border-2 w-full bg-gray-400 font-bold"
                      : isPending
                      ? "pending"
                      : ""
                  }
                >
                  <FaPeopleGroup />
                  Manage Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="mb-3">
                <NavLink
                  to={"/dashboard/user-home"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "border-2 w-full bg-gray-400 font-bold "
                      : isPending
                      ? "pending"
                      : ""
                  }
                >
                  <FaHome />
                  User Home
                </NavLink>
              </li>
              <li className="mb-3">
                <NavLink
                  to={"/dashboard/saved-jobs"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "border-2 w-full bg-gray-400 font-bold "
                      : isPending
                      ? "pending"
                      : ""
                  }
                >
                  <FaSave />
                  Saved Jobs
                </NavLink>
              </li>
              <li className="mb-3">
                <NavLink
                  to={"/dashboard/applied-jobs"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "border-2 w-full bg-gray-400 font-bold "
                      : isPending
                      ? "pending"
                      : ""
                  }
                >
                  <FaCalendar />
                  Applied Jobs
                </NavLink>
              </li>

              <li className="mb-3">
                <NavLink
                  to={"/dashboard/add-review"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "border-2 w-full bg-gray-400 font-bold "
                      : isPending
                      ? "pending"
                      : ""
                  }
                >
                  <FaAd />
                  ADD REVIEW
                </NavLink>
              </li>
            </>
          )}
          <div className="divider my-5"></div>

          <li className="mb-3">
            <NavLink
              to={"/"}
              className={({ isActive, isPending }) =>
                isActive
                  ? "border-2 w-full bg-gray-400 font-bold "
                  : isPending
                  ? "pending"
                  : ""
              }
            >
              <FaHome />
              HOME
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to={"/all-jobs-card"}
              className={({ isActive, isPending }) =>
                isActive
                  ? "border-2 w-full bg-gray-400 font-bold "
                  : isPending
                  ? "pending"
                  : ""
              }
            >
              <FaList />
              ALL JOBS
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to={"/blogs"}
              className={({ isActive, isPending }) =>
                isActive
                  ? "border-2 w-full bg-gray-400 font-bold"
                  : isPending
                  ? "pending"
                  : ""
              }
            >
              <FaReadme />
              BLOGS
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1  w-full mb-10 mx-0 md:mx-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
