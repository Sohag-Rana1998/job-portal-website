import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import useAllJobsData from '../Hooks/useAllJobsData/useAllJobsData';
import JobCard from './JobCard';
const JobByCategory = () => {
  const { data } = useAllJobsData();
  console.log(data);
  return (
    <Tabs>
      <div className=" container px-6 py-10 mx-auto bg-blue-100 rounded-t-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
          Browse Jobs By Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
          Four categories available for the time being. They are On Site Job,
          Remote Job, Part-Time Job and Hybrid Job. Browse them by clicking on
          the tabs below.
        </p>
        <div className="flex items-center justify-center bg-orange-50 py-5 rounded-t-md">
          <TabList>
            <Tab>On Site</Tab>
            <Tab>Remote</Tab>
            <Tab>Part-Time</Tab>
            <Tab>Hybrid</Tab>
          </TabList>
        </div>
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data &&
              data
                .filter(j => j.category === 'On Site')
                .map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data &&
              data
                .filter(j => j.category === 'Remote')
                .map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data &&
              data
                .filter(j => j.category === 'Part-Time')
                .map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
