import { useEffect, useState } from 'react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-tailwind/react';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import { toast } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';

const JobDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState({});
  const [modalLoading, setModalLoading] = useState(true);
  const applicationDate = new Date();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axiosSecure.get(`job/${id}`);
      setJobData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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
    applicant_count,
  } = jobData || {};

  const present = new Date(applicationDate).toLocaleDateString();
  const lastDate = new Date(deadline).toLocaleDateString();

  const handleApplyJob = async e => {
    e.preventDefault();

    if (present > lastDate)
      return toast.success('Sorry! Application deadline is over for this job.');
    // if (employer.email == user?.email)
    //   return toast.success('You are not eligible to apply this job');
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
      totalApplicant: applicant_count,
    };

    try {
      const { data } = await axiosSecure.post(`/apply-now`, applicantData);
      console.log(data);
      console.log(data);
      toast.success('Application Successfully Submitted!');
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="my-8 ">
      <Helmet>
        <title>Job Portal | Details </title>
      </Helmet>

      <div className="h-32 mb-10 bg-black md:h-40  w-full rounded-xl flex justify-between items-center">
        <h1 className="text-2xl h-full text-white flex items-center  w-full md:text-4xl font-bold   justify-center">
          Job Details
        </h1>
        <div className="h-full w-full rounded-xl">
          <img
            className="h-full w-full rounded-xl"
            src="https://i.postimg.cc/Ssq2VxLb/banner.png"
            alt=""
          />
        </div>
      </div>

      <div className="h-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-5 items-start">
          <div color="transparent" className="m-0 w-full p-0 rounded-none">
            <div className="relative overflow-hidden  h-[500px]">
              <img
                src={job_banner}
                className="w-full rounded-2xl  h-full hover:scale-[110%] duration-700"
                alt="ui/ux review check"
              />
            </div>
          </div>

          <div className="flex w-full flex-col  justify-between h-auto  ">
            <div>
              <div>
                <div>
                  <Typography className="text-2xl font-bold">
                    Job Title: {job_title}
                  </Typography>
                  <Typography className=" font-bold text-xl">
                    Category: {category}
                  </Typography>
                </div>

                <div className="flex flex-col md:flex-row justify-between ">
                  <div>
                    <h3 className=" text-xl  font-bold ">
                      Salary Range: ${min_salary}-{max_salary}
                    </h3>
                    <div className="text-xl   font-bold">
                      <span className="font-bold ">
                        Job Posting Date:{' '}
                        {new Date(dateOfPosting).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xl   font-bold">
                      <span className="font-bold ">
                        Application Deadline:
                        {new Date(deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Typography
                  variant="lead"
                  className="font-normal md:font-semibold flex  gap-2 "
                >
                  <span className="font-bold">
                    Job Applicants Number:{applicant_count}
                  </span>
                </Typography>

                <Typography variant="lead" className="text-lg mt-2">
                  <span className="font-bold">Details About The Job: </span>
                  {description}
                </Typography>
              </div>
            </div>
            <div>
              <div>
                <h4>Employer Name: {employer?.name}</h4>
                <h4>Employer Email: {employer?.email}</h4>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-end  r mt-3">
              <label
                onClick={() => {
                  setModalLoading(false);
                  setTimeout(setModalLoading, 500, true);
                }}
                htmlFor="my_modal_6"
                className="btn bg-blue-gray-200"
              >
                Apply Now
              </label>
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
                            <label className="text-gray-700 " htmlFor="name">
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
                            <label
                              className="text-gray-700 "
                              htmlFor="emailAddress"
                            >
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
                          <label
                            className="text-gray-700 "
                            htmlFor="resume_link"
                          >
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
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default JobDetails;
