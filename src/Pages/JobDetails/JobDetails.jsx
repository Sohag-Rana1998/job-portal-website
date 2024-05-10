import { useEffect, useState } from 'react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import { Button, Typography } from '@material-tailwind/react';

const JobDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState({});

  useEffect(() => {
    axiosSecure.get(`job/${id}`).then(data => {
      const job = data.data;

      if (job) {
        setLoading(false);
        setJobData(job);
      }
    });
  }, [id, axiosSecure]);

  const {
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
            <div className="relative overflow-hidden  h-[450px]">
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
                  <span className="font-bold">Details About The Spot: </span>
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
              <Button
                size="lg"
                className="bg-blue-600 w-full md:w-40 hover:bg-blue-gray-900"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default JobDetails;
