import { FaMagnifyingGlass } from 'react-icons/fa6';

const Banner = () => {
  return (
    <div className="container mx-auto font-raleway ">
      <div className="w-full border-b-0 md:border-b-[20px] md:border-[#ff4153] md:rounded-bl-[500px] bg-[#EFEFEF] md:bg-[url(https://i.postimg.cc/JzzCKjLj/first-banner.png)] bg-no-repeat bg-cover  bg-center h-[460px] md:h-[780px]">
        <div className="ml-2 md:ml-14 pt-10 md:pt-28 w-full text-center md:text-left md:w-[60%] lg:w-[45%]">
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
                <form className="flex flex-col lg:flex-row gap-5 items-center">
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
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex  hidden  flex-col items-center w-[80%] gap-5">
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
    </div>
  );
};

export default Banner;

// background-image: url('../images/home/first-banner.png');
//   background-position: center;
//   background-size: cover;
// background-repeat: no-repeat;
//   height: auto;
// width: 100%;
// border-bottom: 20px solid #ff4153;
//   border-bottom-left-radius: 500px;
