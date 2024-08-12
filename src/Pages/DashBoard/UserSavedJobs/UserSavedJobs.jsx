import { IoIosArrowDropdown } from "react-icons/io";
import "react-datepicker/dist/react-datepicker.css";
import { ScrollRestoration } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../Components/Hooks/useAuth/useAuth";
import useSavedJobs from "../../../Components/Hooks/useSavedJobs/useSavedJobs";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure/useAxiosSecure";

const UserSavedJobs = () => {
  const { user } = useAuth();
  const [modalLoading, setModalLoading] = useState(true);
  const applicationDate = new Date();
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState({});
  const [filter, setFilter] = useState("");
  const { savedJobs, refetch, isLoading } = useSavedJobs(filter);
  console.log(data);

  const {
    _id,
    job_banner,
    job_title,
    category,
    min_salary,
    max_salary,
    dateOfPosting,
    deadline,
    description,
    employer,
    employerEmail,
    applicant_count,
  } = data || {};
  const present = new Date(applicationDate).toLocaleDateString();
  const lastDate = new Date(deadline).toLocaleDateString();
  const handleApplyJob = async (e) => {
    e.preventDefault();

    if (employerEmail == user?.email) {
      return toast.error("You are not eligible to apply this job");
    }

    if (present > lastDate)
      return toast.error("Sorry! Application deadline is over for this job.");

    const form = e.target;
    const resume = form.resume_link.value;
    const email = form.email.value;
    const name = form.name.value;
    const jobId = _id;

    const applicantData = {
      jobId,
      job_banner,
      job_title,
      category,
      min_salary,
      max_salary,
      dateOfPosting,
      deadline,
      applicationDate,
      description,
      employer,

      applicantEmail: email,
      applicantName: name,
      applicantResume: resume,
      totalApplicant: parseInt(applicant_count) + 1,
    };

    try {
      const { data } = await axiosSecure.post(`/apply-now`, applicantData);
      console.log(data);
      if (data?.message) {
        return toast.error(data.message);
      }

      toast.success("Application Successfully Submitted!");

      refetch();
    } catch (error) {
      console.log(error);
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
    <div className="w-full mt-5 mx-auto px-5 ">
      <Helmet>
        <title>Job Portal | Saved Jobs List</title>
      </Helmet>
      <div>
        <div>
          <div className=" rounded-t-xl h-40   w-full  flex flex-col items-center justify-center   bg-[url(https://i.postimg.cc/qBFs9xb5/career-banner.jpg)] bg-center bg-no-repeat bg-cover  relative">
            <div className=" inset-0 text-white absolute p-2 md:p-5 rounded-t-xl bg-gradient-to-r from-gray-900 ">
              <div className=" text-center md:text-left">
                <div>
                  <div className="w-full px-0  ">
                    <h4 className="text-2xl md:text-4xl font-bold underline mb-2">
                      Your Saved Jobs
                    </h4>
                    <div className=" text-left">
                      <h4 className=" font-bold">
                        {" "}
                        User Name: {user?.displayName}
                      </h4>
                      <h4 className="  font-bold">User Email: {user?.email}</h4>
                      <h4 className="  font-bold">
                        Total Saved: {savedJobs?.length}
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
                  <li
                    onClick={() => {
                      setFilter("");
                      setTimeout(refetch, 300);
                    }}
                  >
                    <a>All Job</a>
                  </li>
                  <li
                    onClick={() => {
                      setFilter("On Site");
                      setTimeout(refetch, 300);
                    }}
                  >
                    <a>On Site Job</a>
                  </li>
                  <li
                    onClick={() => {
                      setFilter("Remote");
                      setTimeout(refetch, 300);
                    }}
                  >
                    <a>Remote Job</a>
                  </li>
                  <li
                    onClick={() => {
                      setFilter("Part-Time");
                      setTimeout(refetch, 300);
                    }}
                  >
                    <a>Part-Time Job</a>
                  </li>
                  <li
                    onClick={() => {
                      setFilter("Hybrid");
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
            {savedJobs && savedJobs?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table ">
                  {/* head */}

                  <thead>
                    <tr className="bg-[#7ad3da]">
                      <th>No:</th>
                      <th>Job Title</th>
                      <th>Category</th>
                      <th>Salary Range</th>
                      <th>Deadline</th>
                      <th>Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {savedJobs &&
                      savedJobs?.map((job, index) => (
                        <tr key={job?._id} className="bg-base-200">
                          <th>{index + 1}</th>
                          <td>{job?.job_title}</td>
                          <td className="w-24">{job.category}</td>
                          <td>
                            ${job?.min_salary}-{job.max_salary}
                          </td>
                          <td>
                            {new Date(job?.deadline).toLocaleDateString()}
                          </td>

                          <td>
                            <label
                              onClick={() => {
                                setModalLoading(false);
                                setData(job);
                                setTimeout(setModalLoading, 500, true);
                              }}
                              htmlFor="my_modal_6"
                              className="btn bg-blue-500 w-full md:w-40 rounded-3xl hover:bg-gray-500 text-white"
                            >
                              Apply Now
                            </label>
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
      {/* Modal for update  */}
      <div className="w-full mx-auto">
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal max-w-7xl mx-auto" role="dialog">
          <div className="modal-box !max-w-3xl !max-h-[500px] right-0 absolute!">
            {modalLoading ? (
              <div>
                <div>
                  <div className="mt-5 mb-8">
                    <p className="text-center text-3xl font-semibold dark:text-white">
                      Please fill up the following Information
                    </p>
                  </div>
                  {/* form */}
                  <div className="w-full">
                    <form onSubmit={handleApplyJob} className="w-full">
                      <div className="grid grid-cols-1 w-full gap-6 mt-4 md:grid-cols-2">
                        <div>
                          <label className="" htmlFor="name">
                            Applicant Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            defaultValue={user?.displayName}
                            type="text"
                            placeholder="Job Banner Photo URL"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                          />
                        </div>

                        <div>
                          <label className=" " htmlFor="emailAddress">
                            Applicant Email Address
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
                      </div>
                      <div className="flex flex-col gap-2 mt-4">
                        <label className=" " htmlFor="resume_link">
                          Applicant Resume URL
                        </label>
                        <input
                          id="resume_link"
                          type="text"
                          name="resume_link"
                          placeholder="Resume URL"
                          required
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="mt-6">
                        <button className="modal-action w-full flex justify-center  p-3">
                          <label
                            htmlFor="my_modal_6"
                            className="btn w-full flex justify-center  bg-blue-500 text-white hover:bg-gray-800"
                          >
                            Submit
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
      <ScrollRestoration />
    </div>
  );
};

export default UserSavedJobs;
