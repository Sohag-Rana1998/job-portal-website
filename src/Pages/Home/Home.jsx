import JobByCategory from '../../Components/JobByCategory/JobByCategory';

import Banner from './Banner';

const Home = () => {
  return (
    <div className="text-xl text-primary">
      <div>
        <Banner></Banner>
        <div className="mt-15">
          <JobByCategory />
        </div>
      </div>
    </div>
  );
};

export default Home;
