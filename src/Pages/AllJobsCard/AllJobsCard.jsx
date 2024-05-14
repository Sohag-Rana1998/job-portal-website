import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';
import JobCard from '../JobByCategory/JobCard';

const AllJobsCard = () => {
  const axiosSecure = useAxiosSecure();
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
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
  const pageArray = [...Array(totalPage).keys()].map(element => element + 1);

  console.log(totalPage);
  const handleSearch = async e => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
    setLoading(true);
  };

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
    <div className="container mx-auto  mt-5 ">
      <Helmet>
        <title>Job Portal | All Jobs </title>
      </Helmet>
      <div>
        <div>
          <div className="">
            <div className="h-32 mb-5 rounded-t-xl md:h-60 bg-no-repeat bg-center bg-cover w-full  flex flex-col items-center justify-center bg-[url(https://i.postimg.cc/rstCStvL/banner-job-ads-1.jpg)] bg-opacity-50 relative">
              <div className=" inset-0 absolute rounded-t-xl bg-gradient-to-r from-gray-900 ">
                <div className=" pl-20 mt-10">
                  <h2 className=" md:text-4xl font-bold text-white mb-5">
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
              <div></div>
            </div>
          </div>

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
          <div className="grid grid-cols-1 bg-brown-50 px-10 py-5 rounded-md gap-8  md:grid-cols-2 ">
            {jobs &&
              jobs.map(job => <JobCard key={job._id} job={job}></JobCard>)}
          </div>
          <div>
            {jobs && parseInt(count) > 4 ? (
              <div className="flex justify-center items-center my-5 bg-blue-400 rounded-xl p-3">
                <div className="flex">
                  <a
                    onClick={() => setCurrentPage(currentPage - 1)}
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
                      currentPage == pageArray.length
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
        </div>
      </div>
    </div>
  );
};

export default AllJobsCard;
