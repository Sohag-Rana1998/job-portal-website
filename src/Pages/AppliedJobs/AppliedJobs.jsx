import { IoIosArrowDropdown } from 'react-icons/io';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, ScrollRestoration } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import { Helmet } from 'react-helmet-async';

const AppliedJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [mylist, setMylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    const JobsData = async () => {
      const { data } = await axiosSecure.get(
        `/my-application-list?email=${user?.email}&filter=${filter}`
      );
      if (data) {
        console.log(data);
        setMylist(data);
        setLoading(false);
      }
    };
    if (user?.email) {
      JobsData();
    }
  }, [filter, user?.email, axiosSecure]);

  console.log(filter);

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
    <div className="max-w-7xl container mt-5 mx-auto px-5 ">
      <Helmet>
        <title>Job Portal | Applied Jobs List</title>
      </Helmet>
      <div>
        <div>
          <div className="h-32 mb-5 rounded-t-xl md:h-60  w-full  flex flex-col items-center justify-center   bg-[url(https://i.postimg.cc/qBFs9xb5/career-banner.jpg)] bg-center bg-no-repeat bg-cover  relative">
            <div className=" inset-0 text-white absolute rounded-t-xl bg-gradient-to-r from-gray-900 ">
              <div className=" pl-20 mt-10">
                <div>
                  <div className="w-full px-0  ">
                    <h4 className="text-4xl font-bold underline mb-5">
                      Your Applied Job
                    </h4>
                    <div className=" text-left">
                      <h4 className="text xl font-bold">
                        {' '}
                        Applicants Name: {user?.displayName}
                      </h4>
                      <h4 className="text xl font-bold">
                        Applicants Email: {user?.email}
                      </h4>
                      <h4 className="text xl font-bold">
                        Total Job Applied : {mylist?.length}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  <li onClick={() => setFilter('')}>
                    <a>All Job</a>
                  </li>
                  <li onClick={() => setFilter('On Site')}>
                    <a>On Site Job</a>
                  </li>
                  <li onClick={() => setFilter('Remote')}>
                    <a>Remote Job</a>
                  </li>
                  <li onClick={() => setFilter('Part-Time')}>
                    <a>Part-Time Job</a>
                  </li>
                  <li onClick={() => setFilter('Hybrid')}>
                    <a>Hybrid Job</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="divider w-full mb-5 px-0 md:px-32 "></div>

          <div className="  ">
            {mylist && mylist?.length > 0 ? (
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
                    {mylist &&
                      mylist?.map((job, index) => (
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
                                Download Job Summery
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
