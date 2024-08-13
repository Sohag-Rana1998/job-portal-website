import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";
import { EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
const Banner = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleAlert = () => {
    if (searchText.length === 0)
      toast.success("Please input some text for search!");
  };

  return (
    <div className=" w-full mx-auto font-raleway h-full mb-5 -mt-24 md:-mt-16 relative">
      <Swiper
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper w-full h-[650px]"
      >
        {/* slide 1 */}
        <SwiperSlide>
          <div className="w-full mt-5 px-5 md:px-0   md:mt-0  text-white bg-[url(https://i.postimg.cc/0j6Fdv1q/01-9a03b3fb.jpg)] bg-no-repeat bg-cover h-full bg-center  mb-5"></div>
        </SwiperSlide>
        {/* slide 2 */}
        <SwiperSlide>
          <div className="w-full mt-5 px-5 md:px-0   md:mt-0  text-white bg-[url(https://i.postimg.cc/HxK17045/2.jpg)] bg-no-repeat bg-cover h-full bg-center  mb-5 relative">
            <div className="inset-0 absolute z-10 bg-black bg-opacity-70"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full mt-5 px-5 md:px-0   md:mt-0  text-white bg-[url(https://i.postimg.cc/Ls0XrnGN/1.jpg)] bg-no-repeat bg-cover h-full bg-center  mb-5 relative">
            <div className="inset-0 absolute z-10 bg-black bg-opacity-70"></div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="inset-0 absolute z-10">
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
            y: { type: "spring" },
            opacity: { duration: 1 },
            ease: "easeIn",
            duration: 1,
          }}
          className="text-center w-[95%] pt-28 md:w-[80%] lg:w-[60%] mx-auto  flex flex-col items-center justify-center h-full"
        >
          <div className="text-4xl md:text-5xl lg:text-7xl font-bold text-white  mb-4">
            Find Your Favourite <br />
            <span className=" text-[#ff4153] ">Job Immediete</span>
          </div>

          <div className="text-white  mb-10 text-sm md:text-[16px] px-4 md:px-20">
            {` Find the job you've always dreamed of with our comprehensive job
          portal. Explore thousands of vacancies from top companies and start
          building your future.`}
          </div>
          <div className="w-full">
            <div>
              <div className=" mb-10 ">
                <div className="flex w-full  gap-5 items-center ">
                  <div className="relative w-[95%] md:w-[80%] mx-auto">
                    <label htmlFor="search"></label>
                    <input
                      onChange={(e) => handleSearch(e)}
                      type="text"
                      name="search"
                      id="search"
                      value={searchText}
                      className="py-5 pl-10 text-sm rounded outline-none w-full text-black border mx-auto  bg-[#EFEFEF] "
                      placeholder="Search By Job Title"
                    />
                    <FaMagnifyingGlass
                      className={
                        searchText.length === 0
                          ? "absolute left-5 md:left-3  top-5 text-gray-400"
                          : "absolute hidden left-5 md:left-3 top-4 text-gray-500"
                      }
                    />

                    <button
                      onClick={handleAlert}
                      className={
                        searchText.length === 0
                          ? "btn absolute right-2 top-[7px] mx-auto mb-3 md:mb-0 w-24  md:w-32  px-4  bg-[#ff4153] font-bold text-white border-none  hover:bg-gray-900 rounded"
                          : "hidden"
                      }
                    >
                      Search
                    </button>

                    <Link
                      to={`/searchJob/${searchText || "aaaa"}`}
                      className=" "
                    >
                      <button
                        className={
                          searchText.length > 0
                            ? "btn  right-2 top-[7px] absolute mx-auto mb-3 md:mb-0  w-24  md:w-32  px-4 rounded bg-[#ff4153] font-bold text-white  border-none   hover:bg-gray-900"
                            : "hidden"
                        }
                      >
                        Search
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
