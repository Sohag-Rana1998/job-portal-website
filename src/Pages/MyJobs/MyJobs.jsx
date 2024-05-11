import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ScrollRestoration } from 'react-router-dom';

import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import { Helmet } from 'react-helmet-async';

const MyJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [mylist, setMylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState({});
  const [postingDate, setPostingDate] = useState(new Date());
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [modalLoading, setModalLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      myJobsData();
    }
  }, [user?.email]);

  const myJobsData = async () => {
    try {
      const { data } = await axiosSecure.get(
        `/my-job-list?email=${user?.email}`
      );
      console.log(data);
      setMylist(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

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
          myJobsData();
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

    console.log(dateOfPosting, deadline);

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

    console.log(jobData);

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
        await myJobsData();

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

  return loading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="max-w-7xl container mx-auto px-5 ">
      <Helmet>
        <title>Job Portal | My Jobs List</title>
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
                  User Name: {user?.displayName}
                </h4>
                <h4 className="text xl font-bold">User Email: {user?.email}</h4>
                <h4 className="text xl font-bold">
                  Total Job : {mylist?.length}
                </h4>
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
                      <th>Banner Image</th>
                      <th>Job Title</th>
                      <th>Category</th>
                      <th>Salary Range</th>
                      <th>Job Posting Date</th>
                      <th>Application Deadline </th>
                      <th>Action1</th>
                      <th>Action2 </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {mylist &&
                      mylist?.map((job, index) => (
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
                              Update
                            </label>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDelete(job._id)}
                              className="btn bg-blue-gray-200"
                            >
                              Delete
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
                      <th>Banner Image</th>
                      <th>Job Title</th>
                      <th>Category</th>
                      <th>Salary Range</th>
                      <th>Job Posting Date</th>
                      <th>Application Deadline </th>
                      <th>Action1</th>
                      <th>Action2 </th>
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
                <div className="text-center mb-10 md:mb-40 text-3xl font-bold">
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
