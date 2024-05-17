import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { motion } from 'framer-motion';
import JobCard from './JobCard';
import { Link } from 'react-router-dom';
import useJobsData from '../../Components/Hooks/useJobsData/useJobsData';

const JobByCategory = () => {
  const { data } = useJobsData();

  return (
    <Tabs>
      <div className=" container px-6 mt-16 mx-auto rounded-t-md">
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
            y: { type: 'spring' },
            opacity: { duration: 1 },
            ease: 'easeIn',
            duration: 1,
          }}
          className="text-3xl font-bold text-center text-black capitalize md:text-5xl "
        >
          Browse Jobs By <span className="text-[#ff4153]">Categories</span>
        </motion.div>

        <motion.p
          initial={{
            y: 100,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
            y: { type: 'spring' },
            opacity: { duration: 1 },
            ease: 'easeIn',
            duration: 1,
          }}
          className="max-w-2xl mx-auto mt-2 mb-3 text-center  text-black"
        >
          Four categories available for the time being. They are On Site Job,
          Remote Job, Part-Time Job and Hybrid Job. Browse them by clicking on
          the tabs below.
        </motion.p>
        <div className="flex py-5 text-black items-center justify-center bg-white rounded-t-3xl">
          <TabList>
            <Tab>All Jobs</Tab>
            <Tab> Remote</Tab>
            <Tab>On Site</Tab>
            <Tab>Part-Time</Tab>
            <Tab>Hybrid</Tab>
          </TabList>
        </div>
        <TabPanel>
          <div>
            <div className="grid grid-cols-1 gap-10 mt-8 lg:grid-cols-2 ">
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
          <div className="grid grid-cols-1 gap-10 mt-8  lg:grid-cols-2 ">
            {data &&
              data
                .filter(j => j.category === 'Remote')
                .map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8  lg:grid-cols-2 ">
            {data &&
              data
                .filter(j => j.category === 'On Site')
                .map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
            {data &&
              data
                .filter(j => j.category === 'Part-Time')
                .map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8  lg:grid-cols-2 ">
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
