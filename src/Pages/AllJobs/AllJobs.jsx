import { useEffect, useState } from 'react';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import { Helmet } from 'react-helmet-async';
import { Link, ScrollRestoration } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';
import useAllJobsData from '../../Components/Hooks/useAllJobsData/useAllJobsData';
import { GrLinkNext } from 'react-icons/gr';

const AllJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const { data, isLoading, refetch } = useAllJobsData(
    currentPage,
    itemsPerPage,
    search
  );

  const handleAlert = () => {
    if (!user) return toast.success('You have to log in first to view details');
  };

  //Get data count here
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure.get(`/jobs?search=${search}`);

      if (data) {
        setCount(data.count);
      }
    };
    getCount();
    setLoader(true);
    setTimeout(setLoader, 1000, false);
  }, [search, axiosSecure]);

  const totalPage = Math.ceil(parseInt(count) / itemsPerPage);
  const pageArray = [...Array(totalPage).keys()].map(element => element + 1);

  const handleSearch = async e => {
    setLoader(true);
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
    setTimeout(refetch, 300);
    setTimeout(setLoader, 1000, false);
  };

  return isLoading || loader ? (
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
    <div className="max-w-7xl container mx-auto px-5 ">
      <Helmet>
        <title>Job Portal | All Jobs </title>
      </Helmet>
      <div>
        <div>
          <div className="mt-10">
            <div className="mb-5 rounded-t-xl h-60 bg-no-repeat bg-center bg-cover w-full  flex flex-col items-center justify-center bg-[url(https://i.postimg.cc/rstCStvL/banner-job-ads-1.jpg)] bg-opacity-50 relative">
              <div className=" inset-0 absolute rounded-t-xl bg-gradient-to-r from-gray-900 ">
                <div className="pl-0 p-5  md:pl-20 mt-1 md:mt-10 text-center md:text-left">
                  <h2 className=" text-2xl md:text-4xl font-bold text-white mb-2 md:mb-5">
                    Explore All Awesome Jobs
                  </h2>
                  <p className="text-white">
                    Unleash your potential on our job portal. Find tailored
                    opportunities, connect with top employers, <br /> and
                    elevate your career. Your next big opportunity awaits.
                    Explore today!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="divider w-full mb-10 px-0 md:px-32 "></div>
          <div>
            <div>
              <div className=" w-[80%] mx-auto md:w-full block md:flex mb-5  md:justify-end ">
                <form onSubmit={handleSearch}>
                  <label htmlFor="search"></label>
                  <input
                    className="input bg-gray-200 w-full md:w-60 border mb-5 mr-3"
                    id="search"
                    name="search"
                    placeholder="Search By Job Title"
                    type="text"
                    required
                  />
                  <button className="btn w-full md:w-40 py-[14px] px-4 rounded-lg hover:bg-gray-900 font-bold text-white bg-blue-500">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
          {data && data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table ">
                {/* head */}
                <thead>
                  <tr>
                    <th>No:</th>
                    <th>Job Title</th>
                    <th>Job Posting Date</th>
                    <th>Application Deadline</th>
                    <th>Salary range</th>
                    <th>Details</th>
                  </tr>
                </thead>

                <tbody>
                  {/* row 1 */}
                  {data &&
                    data?.map((job, index) => (
                      <tr key={index} className="bg-base-200">
                        <th>{index + 1}</th>

                        <td>{job?.job_title}</td>
                        <td>
                          {new Date(job.dateOfPosting).toLocaleDateString()}
                        </td>
                        <td>{new Date(job.deadline).toLocaleDateString()}</td>
                        <td>
                          ${job.min_salary}-{job.max_salary}
                        </td>

                        <td>
                          <Link to={`/job-details/${job._id}`}>
                            {' '}
                            <button
                              onClick={handleAlert}
                              className="btn bg-blue-500 w-full md:w-40 rounded-3xl hover:bg-gray-500 text-white"
                            >
                              View Details <GrLinkNext />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table ">
                {/* head */}
                <thead>
                  <tr>
                    <th>No:</th>
                    <th>Job Title</th>
                    <th>Job Posting Date</th>
                    <th>Application Deadline</th>
                    <th>Salary range</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}

                  <tr className="bg-base-200">
                    <th></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div className=" mt-5 mb-10 md:mb-40  font-bold">
                <h3 className="text-center mb-10 text-3xl"> No Data Found</h3>
                <div className="w-full flex justify-end my-5">
                  <button
                    onClick={() => {
                      setSearch('');
                      setTimeout(refetch, 300);
                    }}
                    className="btn bg-gray-500 text-white text-right"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {data && parseInt(count) > 4 ? (
          <div className="flex justify-center items-center my-5 bg-blue-400 rounded-xl p-3">
            <div className="flex">
              <a
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  setTimeout(refetch, 300);
                  setLoader(true);
                  setTimeout(setLoader, 1000, false);
                }}
                className={
                  currentPage == 1
                    ? ' hidden'
                    : 'px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md  dark:bg-gray-80 cursor-pointer dark:text-gray-600'
                }
              >
                <div className="flex items-center -mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-1 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>

                  <span className="mx-1">Previous Page</span>
                </div>
              </a>

              {pageArray?.map(page => (
                <button
                  onClick={() => {
                    setCurrentPage(page);
                    setLoader(true);
                    setTimeout(refetch, 300);
                    setTimeout(setLoader, 1000, false);
                  }}
                  key={page}
                  className={
                    currentPage == page
                      ? 'px-4 py-2 hidden md:block mx-1 text-gray-700 transition-colors duration-300 transform bg-blue-500 rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
                      : 'px-4 hidden md:block py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
                  }
                >
                  {page}
                </button>
              ))}

              <a
                className={
                  currentPage == pageArray.length
                    ? 'hidden'
                    : 'px-4 py-2 mx-1  text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
                }
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  setTimeout(refetch, 300);
                  setLoader(true);
                  setTimeout(setLoader, 1000, false);
                }}
              >
                <div className="flex items-center cursor-pointer -mx-1">
                  <span className="mx-1">Next Page</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-1 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-full flex justify-end my-5">
              <button
                onClick={() => {
                  setSearch('');
                  setLoader(true);
                  setTimeout(refetch, 500);
                  setTimeout(setLoader, 500, false);
                }}
                className="btn bg-gray-500 text-white text-right"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default AllJobs;
