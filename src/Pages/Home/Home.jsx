import { ScrollRestoration } from "react-router-dom";
import JobByCategory from "../JobByCategory/JobByCategory";
import Banner from "./Banner";
import JobProcess from "./JobProcess";
import Testimonials from "./Testimonials";
import { Helmet } from "react-helmet-async";
import Agents from "./Agents";
import BannerBottom from "./BannerBottom";

const Home = () => {
  return (
    <div className="text-xl text-primary">
      <Helmet>
        <title>Job Portal | Home</title>
      </Helmet>
      <div>
        <Banner></Banner>
      </div>
      <div className="mt-16">
        <BannerBottom></BannerBottom>
      </div>
      <div className="mt-16">
        <JobByCategory />
      </div>

      <div className="mt-16">
        <JobProcess />
      </div>

      <div className="mt-16">
        <Agents></Agents>
      </div>
      <div className="mt-16">
        <Testimonials></Testimonials>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Home;
