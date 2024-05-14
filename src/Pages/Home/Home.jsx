import { ScrollRestoration } from 'react-router-dom';
import JobByCategory from '../JobByCategory/JobByCategory';
import Banner from './Banner';
import JobProcess from './JobProcess';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div className="text-xl text-primary">
      <div>
        <Banner></Banner>
        <div className="mt-10">
          <JobByCategory />
        </div>
        <div className="mt-16">
          <JobProcess />
        </div>
        <div className="mt-16">
          <Testimonials></Testimonials>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Home;
