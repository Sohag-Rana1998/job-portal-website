import { motion } from "framer-motion";
import React from "react";

const BannerBottom = () => {
  return (
    <div>
      <div className=" overflow-hidden max-w-7xl container mx-auto   flex flex-col md:flex-row  gap-8">
        <motion.div
          initial={{
            x: -100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1,
            x: { type: "spring" },
            opacity: { duration: 1 },
            ease: "easeIn",
            duration: 1,
          }}
          className="w-full lg:w-[40%] overflow-hidden h-[290px] !rounded-none "
        >
          <img
            src="https://i.postimg.cc/76t4jkvP/women.png"
            className="w-full h-full hover:scale-[107%] duration-700"
            alt=""
          />
        </motion.div>
        <motion.div
          initial={{
            x: 100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1,
            x: { type: "spring" },
            opacity: { duration: 1 },
            ease: "easeIn",
            duration: 1,
          }}
          className="w-full lg:w-[58%] text-center md:text-left px-4 md:px-0"
        >
          <div className="text-3xl lg:text-5xl xl:text-6xl  font-bold text-black mb-3 md:mb-5">
            Find Million Of Jobs And
          </div>
          <div className="text-3xl lg:text-4xl  xl:text-5xl font-bold text-[#ff4153] mb-5">
            Achieve Success
          </div>
          <div className="text-black  w-full ">
            Discover your dream job effortlessly. Our job portal connects you
            with thousands of opportunities tailored to your skills and
            aspirations. With intuitive search tools and instant applications,
            your next career move is just a click away. Start your journey to
            success with us today!
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BannerBottom;
