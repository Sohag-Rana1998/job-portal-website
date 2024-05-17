import { IoIosArrowDropdown } from 'react-icons/io';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, ScrollRestoration } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';
import { IoMdDownload } from 'react-icons/io';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import { Helmet } from 'react-helmet-async';
import useAppliedJobsData from '../../Components/Hooks/useAppliedJobsData/useAppliedJobsData';

const AppliedJobs = () => {
  const { user } = useAuth();

  const [filter, setFilter] = useState('');

  const { data, isLoading, refetch } = useAppliedJobsData(user?.email, filter);

  //   setLoading(true);
  //   const JobsData = async () => {
  //     const { data } = await axiosSecure.get(
  //       `/my-application-list?email=${user?.email}&filter=${filter}`
  //     );
  //     if (data) {
  //       console.log(data);
  //       setMylist(data);
  //       setLoading(false);
  //     }
  //   };
  //   if (user?.email) {
  //     JobsData();
  //   }
  // }, [filter, user?.email, axiosSecure]);

  return isLoading ? (
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
    <div className="max-w-7xl container mt-5 mx-auto px-5 ">
      <Helmet>
        <title>Job Portal | Applied Jobs List</title>
      </Helmet>
      <div>
        <div>
          <div className="w-full flex justify-end">
            <div className="mr-4 w-52 md:mr-10">
              <div className="dropdown dropdown-bottom">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 text-white flex border-2 border-blue-500 bg-blue-500 items-center font-bold gap-3 "
                >
                  Filter By Category <IoIosArrowDropdown className="text-xl" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li
                    onClick={() => {
                      setFilter('');
                      setTimeout(refetch, 300);
                    }}
                  >
                    <a>All Job</a>
                  </li>
                  <li
                    onClick={() => {
                      setFilter('On Site');
                      setTimeout(refetch, 300);
                    }}
                  >
                    <a>On Site Job</a>
                  </li>
                  <li
                    onClick={() => {
                      setFilter('Remote');
                      setTimeout(refetch, 300);
                    }}
                  >
                    <a>Remote Job</a>
                  </li>
                  <li
                    onClick={() => {
                      setFilter('Part-Time');
                      setTimeout(refetch, 300);
                    }}
                  >
                    <a>Part-Time Job</a>
                  </li>
                  <li
                    onClick={() => {
                      setFilter('Hybrid');
                      setTimeout(refetch, 300);
                    }}
                  >
                    <a>Hybrid Job</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="divider w-full mb-5 px-0 md:px-32 "></div>

          <div className=" mb-10 ">
            {data && data?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table ">
                  {/* head */}

                  <thead>
                    <tr>
                      <th>No:</th>
                      <th>Job Title</th>
                      <th>Category</th>
                      <th>Salary Range</th>
                      <th>Application Date</th>
                      <th>Download Link </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {data &&
                      data?.map((job, index) => (
                        <tr key={job._id} className="bg-base-200">
                          <th>{index + 1}</th>
                          <td>{job?.job_title}</td>
                          <td className="w-24">{job.category}</td>
                          <td>
                            ${job.min_salary}-{job.max_salary}
                          </td>
                          <td>
                            {new Date(job.applicationDate).toLocaleDateString()}
                          </td>

                          <td>
                            <Link to={`/applicationData/${job._id}`}>
                              <button className="btn">
                                Download Applicants Copy <IoMdDownload />
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
                      <th>Category</th>
                      <th>Salary Range</th>
                      <th>Application Date </th>
                      <th>Download Link</th>
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
                <div className="text-center my-10 md:mb-40 text-3xl font-bold">
                  No Data Found
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default AppliedJobs;
