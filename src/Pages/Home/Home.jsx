import { ScrollRestoration } from 'react-router-dom';
import JobByCategory from '../JobByCategory/JobByCategory';
import Banner from './Banner';
import JobProcess from './JobProcess';
import Testimonials from './Testimonials';
import { Helmet } from 'react-helmet-async';
import Agents from './Agents';

const Home = () => {
  return (
    <div className="text-xl text-primary">
      <Helmet>
        <title>Job Portal | Home</title>
      </Helmet>
      <div>
        <Banner></Banner>
        <div className="mt-10">
          <JobByCategory />
        </div>
        <div className="mt-16">
          <Testimonials></Testimonials>
        </div>
        <div className="mt-16">
          <JobProcess />
        </div>
        <div>
          <div className="my-16">
            <Agents></Agents>
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Home;
