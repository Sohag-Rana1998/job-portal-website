import { useEffect, useState } from 'react';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import { Helmet } from 'react-helmet-async';
import { ScrollRestoration } from 'react-router-dom';
import useAllJobsData from '../../Components/Hooks/useAllJobsData/useAllJobsData';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';

const AllJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const { data, isloading, refetch } = useAllJobsData();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setJobs(data);
      setLoading(false);
    }
  }, [data]);

  const handleSearch = async e => {
    e.preventDefault();
    const searchText = e.target.search.value;

    try {
      const { data } = await axiosSecure.get(`/all-jobs?search=${searchText}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
                        <button className="btn text-white bg-blue-gray-600">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default AllJobs;
