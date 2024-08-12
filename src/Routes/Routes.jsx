import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AppliedJobs from "../Pages/AppliedJobs/AppliedJobs";
import AddJob from "../Pages/AddJob/AddJob";
import MyJobs from "../Pages/MyJobs/MyJobs";
import Blog from "../Pages/Blogs/Blog";
import JobDetails from "../Pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import CreatePDF from "../Pages/AppliedJobs/CreatePDF";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import AllJobsCard from "../Pages/AllJobsCard/AllJobsCard";
import UserProfile from "../Pages/User Profile/UserProfile";
import SearchedJob from "../Pages/SearchedJob/SearchedJob";
import Dashboard from "../Layout/Dashboard";
import AdminHome from "../Pages/DashBoard/AdminHome/AdminHome";
import ManageUsers from "../Pages/DashBoard/ManageUsers/ManageUsers";
import UserHome from "../Pages/DashBoard/UserHome/UserHome";
import UserSavedJobs from "../Pages/DashBoard/UserSavedJobs/UserSavedJobs";
import AddReview from "../Pages/DashBoard/AddReview/AddReview";
import AdminRoute from "./AdminRoute";
import Main from "../Layout/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/all-jobs",
        element: <AllJobsCard></AllJobsCard>,
      },
      {
        path: "/applied-jobs",
        element: (
          <PrivateRoute>
            <AppliedJobs></AppliedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-jobs",
        element: (
          <PrivateRoute>
            <AddJob></AddJob>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <PrivateRoute>
            <MyJobs></MyJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: <Blog></Blog>,
      },
      {
        path: "/blog/:id",
        element: (
          <PrivateRoute>
            <BlogDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/job-details/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/applicationData/:id",
        element: <CreatePDF></CreatePDF>,
      },
      {
        path: "/all-jobs-card",
        element: <AllJobsCard></AllJobsCard>,
      },
      {
        path: "/user-profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/searchJob/:text",
        element: <SearchedJob></SearchedJob>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          // admin routes
          {
            path: "admin-home",
            element: (
              <AdminRoute>
                <AdminHome />
              </AdminRoute>
            ),
          },
          {
            path: "add-job",
            element: (
              <AdminRoute>
                <AddJob />
              </AdminRoute>
            ),
          },
          {
            path: "manage-jobs",
            element: (
              <AdminRoute>
                <MyJobs />
              </AdminRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },

          // user routes
          {
            path: "user-home",
            element: <UserHome />,
          },
          {
            path: "saved-jobs",
            element: <UserSavedJobs />,
          },
          {
            path: "applied-jobs",
            element: <AppliedJobs />,
          },
          {
            path: "add-review",
            element: <AddReview />,
          },
        ],
      },
    ],
  },
]);

export default router;
