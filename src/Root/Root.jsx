import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../Components/Shared/Footer/Footer';

const Root = () => {
  return (
    <div className="max-w-[1400px] w-full mx-auto">
      <div className="container mx-auto">
        <Navbar />
        <div className="pt-16">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Root;
