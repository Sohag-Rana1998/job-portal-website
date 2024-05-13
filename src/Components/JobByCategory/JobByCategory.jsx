import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import useAllJobsData from '../Hooks/useAllJobsData/useAllJobsData';
import JobCard from './JobCard';
import { Link } from 'react-router-dom';
const JobByCategory = () => {
  const { data } = useAllJobsData();
  console.log(data);
  return (
    <Tabs>
      <div className=" container px-6 mt-16 mx-auto rounded-t-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 capitalize md:text-5xl ">
          Browse Jobs By <span className="text-[#ff4153]">Categories</span>
        </h1>

        <p className="max-w-2xl mx-auto mt-2 mb-6 text-center text-gray-500 ">
          Four categories available for the time being. They are On Site Job,
          Remote Job, Part-Time Job and Hybrid Job. Browse them by clicking on
          the tabs below.
        </p>
        <div className="flex text-black items-center justify-center bg-white py-5 rounded-t-3xl">
          <TabList>
            <Tab>All Jobs</Tab>
            <Tab>On Site</Tab>
            <Tab>Remote</Tab>
            <Tab>Part-Time</Tab>
            <Tab>Hybrid</Tab>
          </TabList>
        </div>
        <TabPanel>
          <div>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 ">
              {data &&
                data
                  .slice(0, 6)
                  .map(job => <JobCard key={job._id} job={job} />)}
            </div>
            <div className="mt-5 flex w-full justify-center">
              <Link to={'/all-jobs-card'}>
                <button className="btn bg-[#ff4153] hover:bg-gray-800 text-white">
                  Explore All Jobs
                </button>
              </Link>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 ">
            {data &&
              data
                .filter(j => j.category === 'On Site')
                .map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 ">
            {data &&
              data
                .filter(j => j.category === 'Remote')
                .map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2">
            {data &&
              data
                .filter(j => j.category === 'Part-Time')
                .map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 ">
            {data &&
              data
                .filter(j => j.category === 'Hybrid')
                .map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default JobByCategory;
