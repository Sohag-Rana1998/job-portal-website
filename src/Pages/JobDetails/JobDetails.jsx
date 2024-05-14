import { useEffect, useState } from 'react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-tailwind/react';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import { toast } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
      console.log(data);
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
    employerEmail,
    applicant_count,
  } = jobData || {};

  const present = new Date(applicationDate).toLocaleDateString();
  const lastDate = new Date(deadline).toLocaleDateString();

  const handleApplyJob = async e => {
    e.preventDefault();

    if (employerEmail == user?.email) {
      return toast.error('You are not eligible to apply this job');
    }

    if (present > lastDate)
      return toast.error('Sorry! Application deadline is over for this job.');

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

      toast.success('Application Successfully Submitted!');

      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessageSent = e => {
    e.preventDefault();
    toast.success('Message sent successfully!');
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

      <div className="h-auto px-4 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
          <div className="flex flex-col w-full lg:w-[70%]   justify-between gap-5 items-start">
            <div color="transparent" className="m-0 w-full p-0 rounded-none">
              <div className="relative overflow-hidden rounded-2xl h-[500px]">
                <img
                  src={job_banner}
                  className="w-full rounded-2xl  h-full hover:scale-[105%] duration-700"
                  alt="ui/ux review check"
                />
              </div>
            </div>

            <div className="flex w-full flex-col  justify-between h-auto  ">
              <div>
                <div>
                  <div className="flex justify-between items-center">
                    <Typography className="text-2xl font-bold">
                      Job Title: {job_title}
                    </Typography>
                    <Typography className=" font-bold bg-[#FF4153] text-white py-2 px-4 rounded-3xl">
                      #{category}
                    </Typography>
                  </div>
                  <Typography
                    variant="lead"
                    className="font-normal md:font-semibold flex  gap-2 "
                  >
                    <span className="font-bold">
                      Total Applicants :{applicant_count}
                    </span>
                  </Typography>
                  <div className="flex  w-full my-4 justify-between items-start md:items-center flex-col gap-3 md:flex-row">
                    <div className="text-xl w-60 md:w-auto  font-bold text-white bg-gray-500  py-2 px-4 rounded-3xl">
                      <span className="font-bold ">
                        Posting Date:{' '}
                        {new Date(dateOfPosting).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xl w-60 md:w-auto font-bold text-white bg-gray-500 py-2 px-4 rounded-3xl">
                      <span className="font-bold ">
                        Deadline:
                        {new Date(deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Typography variant="lead" className="text-lg mt-2">
                    <span className="font-bold">Details About The Job: </span>
                    {description}
                  </Typography>
                </div>
              </div>
              <div>
                <div className="font-bold">
                  <h4>Employer Name: {employer?.name}</h4>
                  <h4>Employer Email: {employerEmail}</h4>
                </div>
              </div>
              <div className="flex flex-col  md:flex-row justify-between items-center">
                <div>
                  <h3 className="font-bold  bg-gray-500 text-white py-2 px-4 rounded-3xl">
                    Salary Range: ${min_salary}-{max_salary}
                  </h3>
                </div>
                <div className="flex flex-col md:flex-row justify-end  r mt-3">
                  <label
                    onClick={() => {
                      setModalLoading(false);
                      setTimeout(setModalLoading, 500, true);
                    }}
                    htmlFor="my_modal_6"
                    className="btn bg-blue-500 w-full md:w-40 rounded-3xl hover:bg-gray-500 text-white"
                  >
                    Apply Now
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full  lg:w-[27%] border rounded-2xl shadow-md p-5  ">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Contact With Employer:
            </h3>
            <form onSubmit={handleMessageSent} className="">
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  defaultValue={user?.displayName}
                  type="text"
                  disabled
                  className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Your Email
                </label>
                <input
                  id="name"
                  name="name"
                  disabled
                  defaultValue={user?.email}
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className="" htmlFor="name">
                  Phone
                </label>
                <input
                  id="name"
                  name="phone"
                  type="number"
                  placeholder="Phone Number"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Subject
                </label>
                <input
                  id="name"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Message
                </label>
                <textarea
                  id="name"
                  name="message"
                  type="text"
                  rows="5"
                  placeholder="Message"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                ></textarea>
              </div>
              <button className="btn rounded-3xl w-full bg-gray-900 text-white hover:bg-[#FF4153]">
                Send
              </button>
            </form>
          </div>
          <ScrollRestoration />
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
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default JobDetails;
