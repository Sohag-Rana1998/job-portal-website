import { IoIosArrowDropdown } from 'react-icons/io';
import 'react-datepicker/dist/react-datepicker.css';
import { ScrollRestoration } from 'react-router-dom';

import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import { Helmet } from 'react-helmet-async';

const AppliedJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const userName = user?.displayName;
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
    <div className="w-full min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="max-w-7xl container mx-auto px-5 ">
      <Helmet>
        <title>Job Portal | Applied Jobs List</title>
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

          <div>
            <div className="text-center w-full px-0  mx-auto">
              <h4 className="text-4xl font-bold underline mb-5">
                Your Job List
              </h4>
              <div className=" text-left">
                <h4 className="text xl font-bold">
                  {' '}
                  Applicants Name: {user?.displayName}
                </h4>
                <h4 className="text xl font-bold">
                  {' '}
                  Applicants Email: {user?.email}
                </h4>
                <h4 className="text xl font-bold">
                  Total Job Applied : {mylist?.length}
                </h4>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mb-5">
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

          <div className="divider w-full mb-10 px-0 md:px-32 "></div>

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
                            <button className="btn">
                              Download Job Summery
                            </button>
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
                <div className="text-center mb-10 md:mb-40 text-3xl font-bold">
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
