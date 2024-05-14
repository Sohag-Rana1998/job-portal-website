// import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <div className="container mx-auto font-raleway h-full mb-5">
      <div className="w-full border-b-0 md:border-b-[20px] md:border-[#ff4153] md:rounded-bl-[500px] bg-[#EFEFEF] md:bg-[url(https://i.postimg.cc/JzzCKjLj/first-banner.png)] bg-no-repeat bg-cover  bg-center h-auto md:h-[850px] mb-5">
        <motion.div
          initial={{
            y: -200,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1,
            y: { type: 'spring' },
            opacity: { duration: 1 },
            ease: 'easeIn',
            duration: 1,
          }}
          className="ml-2 md:ml-14 pt-10 md:pt-28 w-full text-center md:text-left md:w-[60%] lg:w-[45%]"
        >
          <div className="text-5xl font-bold text-black mb-3 md:mb-5">
            Find Your Favourite{' '}
          </div>
          <div className="text-4xl font-bold text-[#ff4153] mb-8">
            Job Immediete
          </div>
          <div className="text-black mb-10">
            {` Find the job you've always dreamed of with our comprehensive job
          portal. Explore thousands of vacancies from top companies and start
          building your future.`}
          </div>
          <div>
            <div>
              <div className=" mb-10 ">
                <Link to={'/all-jobs-card'}>
                  <button className="btn  mx-auto  md:w-32 py-[10px] px-4 rounded-3xl bg-gray-900 font-bold text-white  hover:bg-[#ff4153] mb-5 md:mb-0">
                    Explore Now
                  </button>
                </Link>
                {/* <form className="flex flex-col lg:flex-row gap-5 items-center">
                  <div className="relative w-full">
                    <label htmlFor="search"></label>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="py-3 pl-10 w-[95%] mx-auto md:w-[300px] lg:w-[400px] bg-[#EFEFEF] rounded-3xl"
                      placeholder="Search By Job Title"
                    />
                    <FaMagnifyingGlass className="absolute left-3 top-4 text-gray-700" />
                  </div>
                  <button className="btn w-[95%] mx-auto  md:w-32 py-[10px] px-4 rounded-3xl bg-gray-900 font-bold text-white  hover:bg-[#ff4153]">
                    Search
                  </button>
                </form> */}
              </div>
            </div>
          </div>
        </motion.div>
        <div className="lg:flex  hidden mt-16 lg:flex-col xl:flex-row justify-center pr-5 xl:pr-40 items-center w-[80%] gap-5">
          <div className="w-full md:w-[180px] h-[70px]">
            <img
              className="w-full h-full"
              src="https://i.postimg.cc/3RGm0yfv/Google-logo.png"
              alt=""
            />
          </div>
          <div className="w-full md:w-[300px] h-[70px]">
            <img
              className="w-full h-full"
              src="https://i.postimg.cc/vBChpFkW/Microsoft-Logo-PNG.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="mt-20 md:mt-40 flex flex-col md:flex-row justify-between items-center gap-10">
        <motion.div
          initial={{
            y: -100,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1,
            y: { type: 'spring' },
            opacity: { duration: 1 },
            ease: 'easeIn',
            duration: 1,
          }}
          className="w-full lg:w-[30%] overflow-hidden h-[290px] !rounded-none "
        >
          <img
            src="https://i.postimg.cc/76t4jkvP/women.png"
            className="w-full h-full hover:scale-[107%] duration-700"
            alt=""
          />
        </motion.div>
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1,
            y: { type: 'spring' },
            opacity: { duration: 1 },
            ease: 'easeIn',
            duration: 1,
          }}
          className="w-full lg:w-[65%] "
        >
          <div className="text-3xl lg:text-5xl xl:text-6xl  font-bold text-black mb-3 md:mb-5">
            Find Million Of Jobs And
          </div>
          <div className="text-3xl lg:text-4xl  xl:text-5xl font-bold text-[#ff4153] mb-5">
            Achieve Success
          </div>
          <div className="text-black mb-10 w-full md:w-[80%]">
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

export default Banner;
