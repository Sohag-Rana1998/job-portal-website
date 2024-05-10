import DateHandler from './DateHandler';
import JobByCategory from './JobByCategory';

const Home = () => {
  return (
    <div className="text-xl text-primary">
      <JobByCategory />
      <DateHandler />
    </div>
  );
};

export default Home;
