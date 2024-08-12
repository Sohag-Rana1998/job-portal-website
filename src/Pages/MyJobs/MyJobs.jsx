import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ScrollRestoration } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import { Helmet } from 'react-helmet-async';
import useMyJobsData from '../../Components/Hooks/useMyJobsData/useMyJobsData';

const MyJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState({});
  const [postingDate, setPostingDate] = useState(new Date());
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [modalLoading, setModalLoading] = useState(true);
  const { data, isLoading, refetch } = useMyJobsData(user?.email);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-job/${id}`).then(() => {
          // console.log(data);
          Swal.fire({
            title: 'Deleted!',
            text: 'User data has been deleted.',
            icon: 'success',
          });
          refetch();
        });
      }
    });
  };

  const {
    job_banner,
    job_title,
    category,
    min_salary,
    max_salary,
    description,
  } = modalData || '';

  const handleUpdatejob = async e => {
    e.preventDefault();
    const form = e.target;
    const id = modalData._id;
    const applicant_count = modalData.applicant_count;
    const job_banner = form.job_banner.value;
    const job_title = form.job_title.value;
    const category = form.category.value;
    const min_salary = parseFloat(form.min_salary.value);
    const max_salary = parseFloat(form.max_salary.value);
    const dateOfPosting = postingDate;
    const deadline = deadlineDate;
    const description = form.description.value;

    const jobData = {
      job_banner,
      job_title,
      category,
      min_salary,
      max_salary,
      dateOfPosting,
      deadline,
      description,
      applicant_count,
      employer: {
        email: user?.email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
    };

    try {
      const { data } = await axiosSecure.put(`/update-job/${id}`, jobData);
      console.log(data);
      if (data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Updated Your Tourist job Data',
          showConfirmButton: false,
          timer: 1500,
        });
        await refetch();

        form.reset();
      } else {
        Swal.fire({
          title:
            'Not updated. Please Make Some Changes On Your Data And Try Again.',
          showConfirmButton: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

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
    <div className="w-full mx-auto px-5 ">
      <Helmet>
        <title>Job Portal | My Jobs List</title>
      </Helmet>
      <div>
        <div>
          <div className="h-52 mb-5 rounded-t-xl md:h-60  w-full  flex flex-col items-center justify-center   bg-[url(https://i.postimg.cc/qBFs9xb5/career-banner.jpg)] bg-center bg-no-repeat bg-cover  relative">
            <div className=" inset-0 text-white absolute rounded-t-xl bg-gradient-to-r from-gray-900 ">
              <div className="pl-2 md:pl-20 mt-3 md:mt-10 text-center md:text-left">
                <div>
                  <div className="w-full px-0  ">
                    <h4 className="text-4xl font-bold underline mb-5">
                      Your Job List
                    </h4>
                    <div className=" text-left">
                      <h4 className="text xl font-bold">
                        {' '}
                        User Name: {user?.displayName}
                      </h4>
                      <h4 className="text xl font-bold">
                        User Email: {user?.email}
                      </h4>
                      <h4 className="text xl font-bold">
                        Total Job Added: {data?.length}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="divider w-full mb-5 px-0 md:px-32 "></div>

          <div className="  ">
            {data && data?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table ">
                  {/* head */}

                  <thead>
                    <tr>
                      <th>No:</th>
                      <th>Banner Image</th>
                      <th>Job Title</th>
                      <th>Category</th>
                      <th>Salary Range</th>
                      <th>Job Posting Date</th>
                      <th>Application Deadline </th>
                      <th>Update</th>
                      <th>Delete </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {data &&
                      data?.map((job, index) => (
                        <tr key={job._id} className="bg-base-200">
                          <th>{index + 1}</th>

                          <td className="w-32 h-24 md:w-48 md:h-36">
                            <img
                              src={job?.job_banner}
                              className="w-full h-full rounded-lg"
                              alt=""
                            />
                          </td>
                          <td>{job?.job_title}</td>
                          <td className="w-24">{job.category}</td>
                          <td>
                            ${job.min_salary}-{job.max_salary}
                          </td>
                          <td>
                            {new Date(job.dateOfPosting).toLocaleDateString()}
                          </td>
                          <td>{new Date(job.deadline).toLocaleDateString()}</td>
                          <td>
                            <label
                              onClick={() => {
                                setModalData(job);
                                setPostingDate(job.dateOfPosting);
                                setDeadlineDate(job.deadline);
                                setModalLoading(false);
                                setTimeout(setModalLoading, 500, true);
                              }}
                              htmlFor="my_modal_6"
                              className="btn bg-blue-gray-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </label>
                          </td>
                          <td>
                            <a
                              onClick={() => handleDelete(job._id)}
                              className="btn bg-blue-gray-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </a>
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
                      <th>Banner Image</th>
                      <th>Job Title</th>
                      <th>Category</th>
                      <th>Salary Range</th>
                      <th>Job Posting Date</th>
                      <th>Application Deadline </th>
                      <th>Update</th>
                      <th>Delete </th>
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

        {/* Modal for update  */}
        <div className="w-full mx-auto">
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal max-w-7xl mx-auto" role="dialog">
            <div className="modal-box !max-w-5xl !max-h-[500px] right-0 absolute!">
              {modalLoading ? (
                <div>
                  <div>
                    <div className="mt-5 mb-8">
                      <p className="text-center text-3xl font-semibold dark:text-white">
                        Update Your Jobs Data
                      </p>
                    </div>
                    {/* form */}
                    <div className="w-full">
                      <form onSubmit={handleUpdatejob} className="w-full">
                        <div className="grid grid-cols-1 w-full gap-6 mt-4 md:grid-cols-2">
                          <div>
                            <label
                              className="text-gray-700 "
                              htmlFor="job_banner"
                            >
                              Picture URL of the Job Banner
                            </label>
                            <input
                              id="job_banner"
                              name="job_banner"
                              defaultValue={job_banner}
                              type="text"
                              placeholder="Job Banner Photo URL"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                            />
                          </div>
                          <div>
                            <label
                              className="text-gray-700 "
                              htmlFor="job_title"
                            >
                              Job Title
                            </label>
                            <input
                              id="job_title"
                              name="job_title"
                              type="text"
                              defaultValue={job_title}
                              placeholder="Job title"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                            />
                          </div>

                          <div>
                            <label
                              className="text-gray-700 "
                              htmlFor="emailAddress"
                            >
                              User Email
                            </label>
                            <input
                              id="emailAddress"
                              type="email"
                              name="email"
                              disabled
                              defaultValue={user?.email}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="flex flex-col gap-2 ">
                            <label
                              className="text-gray-700 "
                              htmlFor="category"
                            >
                              Category
                            </label>
                            <select
                              name="category"
                              id="category"
                              defaultValue={category}
                              className="border p-2 rounded-md"
                            >
                              <option value="On Site">On Site</option>
                              <option value="Remote">Remote</option>
                              <option value="Part-Time">Part-Time</option>
                              <option value="Hybrid">Hybrid</option>
                            </select>
                          </div>
                          <div>
                            <label
                              className="text-gray-700 "
                              htmlFor="min_salary"
                            >
                              Minimum Salary
                            </label>
                            <input
                              id="min_salary"
                              name="min_salary"
                              type="text"
                              defaultValue={min_salary}
                              placeholder="Minimum Salary"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                            />
                          </div>

                          <div>
                            <label
                              className="text-gray-700 "
                              htmlFor="max_salary"
                            >
                              Maximum Salary
                            </label>
                            <input
                              id="max_salary"
                              placeholder="Maximum Salary"
                              name="max_salary"
                              type="text"
                              defaultValue={max_salary}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="flex flex-col gap-2 ">
                            <label className="text-gray-700">
                              Posting Date
                            </label>

                            {/* Date Picker Input Field */}
                            <DatePicker
                              className="border p-2 rounded-md w-full"
                              selected={postingDate}
                              onChange={date => setPostingDate(date)}
                            />
                          </div>
                          <div className="flex flex-col gap-2 ">
                            <label className="text-gray-700">Deadline</label>

                            {/* Date Picker Input Field */}
                            <DatePicker
                              className="border p-2 rounded-md w-full"
                              selected={deadlineDate}
                              onChange={date => setDeadlineDate(date)}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                          <label
                            className="text-gray-700 "
                            htmlFor="description"
                          >
                            Description
                          </label>
                          <textarea
                            defaultValue={description}
                            placeholder="Description about job"
                            rows="5"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                            name="description"
                            id="description"
                          ></textarea>
                        </div>
                        <div className="mt-6">
                          <button className="modal-action w-full flex justify-center  p-3">
                            <label
                              htmlFor="my_modal_6"
                              className="btn w-full flex justify-center  bg-blue-500 text-white hover:bg-gray-800"
                            >
                              Update Now
                            </label>
                          </button>
                        </div>
                      </form>
                      <div className="w-full flex justify-end mt-2">
                        <label htmlFor="my_modal_6" className="btn">
                          Cancel
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full  flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default MyJobs;
