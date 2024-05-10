import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home';
import Root from '../Root/Root';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import AllJobs from '../Pages/AllJobs/AllJobs';
import AppliedJobs from '../Pages/AppliedJobs/AppliedJobs';
import AddJob from '../Pages/AddJob/AddJob';
import MyJobs from '../Pages/MyJobs/MyJobs';
import Blog from '../Pages/Blogs/Blog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/all-jobs',
        element: <AllJobs></AllJobs>,
      },
      {
        path: '/applied-jobs',
        element: <AppliedJobs></AppliedJobs>,
      },
      {
        path: '/add-jobs',
        element: <AddJob></AddJob>,
      },
      {
        path: '/my-jobs',
        element: <MyJobs></MyJobs>,
      },
      {
        path: '/blogs',
        element: <Blog></Blog>,
      },
    ],
  },
]);

export default router;
