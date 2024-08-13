import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";
import toast from "react-hot-toast";
import useAuth from "../../Components/Hooks/useAuth/useAuth";
const JobCard = ({ job }) => {
  const { user } = useAuth();
  const handleAlert = () => {
    if (!user) toast.success("You have to log in first to view details");
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
  } = job || {};

  return (
    <div className="flex items-start flex-col rounded-t-xl md:flex-row hover:scale-[1.03] duration-500 shadow-lg">
      <div className="w-full h-52 lg:h-64">
        <img src={job_banner} alt="" className="w-full h-full" />
      </div>
      <div className="w-full lg:h-64  px-4 py-3 bg-white    transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-light text-gray-800 ">
            Posting Date: {new Date(dateOfPosting).toLocaleDateString()}
          </span>
          <span className="px-3  text-[12px] font-bold text-blue-800 uppercase bg-blue-200 rounded-xl ">
            {category}
          </span>
        </div>

        <div>
          <h1 className=" text-lg font-semibold text-gray-800 ">{job_title}</h1>
          <h3 className="font-bold text-sm text-gray-600 ">
            Employer:{employer?.name}
          </h3>
          <p title={description} className="mt-1 text-sm text-gray-600 ">
            {description.substring(0, 70)}...
          </p>
          <p className="mt-2 text-sm font-bold text-gray-600 ">
            Salary Range: ${min_salary} - ${max_salary}
          </p>
          <p className=" text-sm font-bold text-gray-600 ">
            Application Placed: {applicant_count}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xs font-light text-gray-800 ">
              Deadline: {new Date(deadline).toLocaleDateString()}
            </span>
            <Link to={`/job-details/${_id}`}>
              <span onClick={handleAlert} className="flex gap-2 items-center">
                <button className="flex text-sm text-gray-800 hover:bg-gray-100 gap-2 bg-blue-200 p-2 rounded-3xl font-extrabold items-center">
                  View Details <GrLinkNext />
                </button>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.object,
};

export default JobCard;
