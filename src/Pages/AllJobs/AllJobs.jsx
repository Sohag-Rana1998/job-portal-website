import { useEffect, useState } from 'react';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import { Helmet } from 'react-helmet-async';
import { Link, ScrollRestoration } from 'react-router-dom';

import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';

const AllJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(4);
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const JobsData = async () => {
      const { data } = await axiosSecure.get(
        `/all-jobs?page=${currentPage}&size=${itemsPerPage}&search=${search}`
      );
      if (data) {
        console.log(data);
        setJobs(data);
        setLoading(false);
      }
    };
    JobsData();
  }, [currentPage, itemsPerPage, axiosSecure, search]);

  useEffect(() => {
    setLoading(true);
    const getCount = async () => {
      const { data } = await axiosSecure.get(`/jobs?search=${search}`);
      console.log(data.count);
      if (data) {
        setCount(data.count);
        setLoading(false);
      }
    };
    getCount();
  }, [search, axiosSecure]);

  const totalPage = Math.ceil(parseInt(count) / itemsPerPage);
  const pageArray = [...Array(totalPage).keys()];

  console.log(totalPage);
  const handleSearch = async e => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
    setLoading(true);
  };

  return loading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="max-w-7xl container mx-auto px-5 ">
      <Helmet>
        <title>Job Portal | All Jobs </title>
      </Helmet>
      <div>
        <div>
          {/* <div className="h-32 mb-10 md:h-40 bg-no-repeat bg-center bg-cover w-full rounded-xl flex items-center justify-center bg-[url(https://i.postimg.cc/qBNMdgtZ/rear-view-of-man-standing-on-mountain-vitor-marigo.jpg)] bg-opacity-50 ">
            <Slide>
              <h1 className="text-2xl md:text-4xl font-bold text-white">
                Your Tourist jobs List
              </h1>
            </Slide>
          </div> */}

          <div className="divider w-full mb-10 px-0 md:px-32 "></div>
          <div>
            <div className="w-full flex justify-end ">
              <form onSubmit={handleSearch}>
                <label htmlFor="search"></label>
                <input
                  className="input bg-gray-200 w-full md:w-60 border mb-5 mr-3"
                  id="search"
                  name="search"
                  placeholder="Search By Job Title"
                  type="text"
                />
                <button className=" py-[14px] px-4 rounded-lg hover:bg-gray-900 font-bold text-white bg-blue-500">
                  Search
                </button>
              </form>
            </div>
          </div>
          {jobs && jobs.length > 0 ? (
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
                  {jobs &&
                    jobs?.map((job, index) => (
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
                            <button className="btn text-white bg-blue-gray-600">
                              View Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {jobs && parseInt(count) > 4 ? (
                <div className="flex justify-center items-center my-5 bg-blue-400 rounded-xl p-3">
                  <div className="flex">
                    <a
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className={
                        currentPage == 0
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

                        <span className="mx-1">previous</span>
                      </div>
                    </a>

                    {pageArray?.map(page => (
                      <button
                        onClick={() => setCurrentPage(page)}
                        key={page}
                        className={
                          currentPage == page
                            ? 'px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-blue-500 rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
                            : 'px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
                        }
                      >
                        {page}
                      </button>
                    ))}

                    <a
                      className={
                        currentPage + 1 == pageArray.length
                          ? 'hidden'
                          : 'px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
                      }
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      <div className="flex items-center cursor-pointer -mx-1">
                        <span className="mx-1">Next</span>

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
                  <div className="w-full flex justify-center mt-5">
                    <button
                      onClick={() => setSearch('')}
                      className="btn bg-gray-500 text-white text-right"
                    >
                      See All Jobs
                    </button>
                  </div>
                </div>
              )}
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
              <div className=" mt-5 mb-10 md:mb-40 text-3xl font-bold">
                <h3 className="text-center mb-10"> No Data Found</h3>
                <div className="w-full flex justify-center">
                  <button
                    onClick={() => setSearch('')}
                    className="btn bg-gray-500 text-white text-right"
                  >
                    See All Jobs
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default AllJobs;
