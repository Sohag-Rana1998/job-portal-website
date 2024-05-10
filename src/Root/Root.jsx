import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Shared/Navbar/Navbar';

const Root = () => {
  return (
    <div className="max-w-[1400px] w-full mx-auto">
      <div className="max-w-7xl container mx-auto">
        <Navbar />
        <div className="pt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
