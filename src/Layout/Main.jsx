import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../Components/Hooks/useAuth/useAuth";
import { useEffect, useState } from "react";

const Main = () => {
  const { loading } = useAuth();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(setLoader, 500, false);
  }, []);
  return loading || loader ? (
    <div className="w-[80%] mx-auto min-h-screen ">
      <SkeletonTheme baseColor="#a2a2b2">
        <div>
          <div className="mt-10 mb-5">
            <Skeleton height={150} />
          </div>

          <Skeleton height={30} count={10} />
        </div>
      </SkeletonTheme>
    </div>
  ) : (
    <div className="w-full mx-auto">
      <div className="w-full mx-auto ">
        <Navbar />
        <div className="pt-16  ">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
