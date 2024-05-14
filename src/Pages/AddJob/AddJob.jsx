import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuth from '../../Components/Hooks/useAuth/useAuth';

const AddJob = () => {
  const { user } = useAuth();

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(setLoader, 500, false);
  }, []);
  const [startDate, setStartDate] = useState(new Date());
  const [postingDate, setPostingDate] = useState(new Date());

  const handleFormSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const job_banner = form.job_banner.value;
    const job_title = form.job_title.value;
    const email = form.email.value;
    const category = form.category.value;
    const min_salary = parseFloat(form.min_salary.value);
    const max_salary = parseFloat(form.max_salary.value);
    const dateOfPosting = postingDate;
    const deadline = startDate;
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
      employer: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
      applicant_count: 0,
    };
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/all-jobs`,
        jobData
      );
      console.log(data);
      toast.success('Job Data Successfully Posted!');
      form.reset();
      // navigate('/my-posted-jobs');
    } catch (err) {
      console.log(err);
    }
  };
  return loader ? (
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
    <div className="flex w-full px-5  justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className=" p-2 w-full md:p-16 mx-auto bg-orange-50 rounded-md shadow-lg ">
        <h2 className="text-2xl underline mb-5  text-center  font-bold text-gray-700 capitalize ">
          Post a Job
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 w-full gap-6 mt-4 md:grid-cols-2 ">
            <div>
              <label className="text-gray-700 " htmlFor="job_banner">
                Picture URL of the Job Banner
              </label>
              <input
                id="job_banner"
                name="job_banner"
                type="text"
                required
                placeholder="Job Banner Photo URL"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700 " htmlFor="job_title">
                Job Title
              </label>
              <input
                id="job_title"
                name="job_title"
                type="text"
                required
                placeholder="Job title"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                User Email
              </label>
              <input
                id="emailAddress"
                type="email"
                required
                name="email"
                disabled
                defaultValue={user?.email}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700 " htmlFor="category">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="border p-2 rounded-md"
              >
                <option value="On Site">On Site</option>
                <option value="Remote">Remote</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700 " htmlFor="min_salary">
                Minimum Salary
              </label>
              <input
                id="min_salary"
                name="min_salary"
                type="number"
                required
                placeholder="Minimum Salary"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="max_salary">
                Maximum Salary
              </label>
              <input
                id="max_salary"
                placeholder="Maximum Salary"
                name="max_salary"
                type="number"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Posting Date</label>

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
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Description
            </label>
            <textarea
              required
              placeholder="Description about job"
              rows="5"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="description"
              id="description"
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="btn text-white w-full bg-blue-500 hover:bg-blue-gray-500 ">
              Add Job
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
