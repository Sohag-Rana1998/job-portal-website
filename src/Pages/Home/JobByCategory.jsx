import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const JobByCategory = () => {
  return (
    <div className="w-full bg-blue-100 rounded-t-lg min-h-screen ">
      <div className="flex justify-center items-center">
        <Tabs className="">
          <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
            <Tab>Title 3</Tab>
            <Tab>Title 4</Tab>
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 4</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default JobByCategory;
