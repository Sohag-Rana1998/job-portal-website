import { Helmet } from 'react-helmet-async';
import { ScrollRestoration } from 'react-router-dom';

const JobCard = ({ job }) => {
  <div className="my-8 ">
    <Helmet>
      <title>Job Portal | Details </title>
    </Helmet>
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
            <button className="btn">View Detail</button>
          </div>
        </div>
      </div>
    </div>
    <ScrollRestoration />
  </div>;
};

export default JobCard;
