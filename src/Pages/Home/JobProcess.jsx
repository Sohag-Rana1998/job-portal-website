import { useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { motion } from 'framer-motion';
const JobProcess = () => {
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  console.log(toggle);
  return (
    <div className="mb-32">
      <div>
        <h1 className="text-3xl font-bold text-center text-black capitalize md:text-5xl ">
          Our Job <span className="text-[#ff4153]">Process</span>
        </h1>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-5">
        <div
          // initial={{
          //   x: -100,
          //   opacity: 0,
          // }}
          // whileInView={{
          //   x: 0,
          //   opacity: 1,
          // }}
          // transition={{
          //   delay: 0.2,
          //   x: { type: 'spring' },
          //   opacity: { duration: 0.5 },
          //   ease: 'easeIn',
          //   duration: 1,
          // }}
          className="w-full h-[450px]  hover:shadow-lg py-7 duration-700 px-14 "
        >
          <div
            onMouseEnter={() => setToggle(true)}
            onMouseLeave={() => setToggle(false)}
            className="flex justify-center items-center flex-col text-center"
          >
            <div
              className={
                toggle
                  ? 'text-white text-5xl duration-700 w-20 h-20 flex justify-center items-center rounded-full bg-black mb-8'
                  : 'text-black text-5xl w-20 h-20 flex justify-center items-center rounded-full  mb-8'
              }
            >
              <BsPeopleFill />
            </div>
            <div className="text-[#ff4153] font-bold text-xl mb-3">
              Create Account
            </div>
            <div className="text-black">
              Ready to embark on a journey towards endless possibilities and
              career growth? Look no further than JobPortal the ultimate
              destination for ambitious professionals like you...
            </div>
            <button
              className={
                toggle
                  ? 'flex gap-2 py-2 text-white mt-8 px-4 rounded-3xl bg-[#ff4153] '
                  : 'gap-2 py-2 hidden text-white mt-8 px-4 rounded-3xl bg-[#ff4153] '
              }
            >
              Read More <MdOutlineNavigateNext />
            </button>
          </div>
        </div>
        <div className="w-full h-[450px] hover:shadow-lg py-7 duration-700 px-14 ">
          <div
            onMouseEnter={() => setToggle1(true)}
            onMouseLeave={() => setToggle1(false)}
            className="flex justify-center items-center flex-col text-center"
          >
            <div
              className={
                toggle1
                  ? 'text-white text-5xl duration-700 w-20 h-20 flex justify-center items-center rounded-full bg-black mb-8'
                  : 'text-black text-5xl w-20 h-20 flex justify-center items-center rounded-full  mb-8'
              }
            >
              <FaMagnifyingGlass />
            </div>
            <div className="text-[#ff4153] font-bold text-xl mb-3">
              Search Job
            </div>
            <div className="text-black">
              Experience lightning-fast search results as you type. Our
              intuitive search bar provides real-time suggestions, making your
              search seamless and efficient....
            </div>
            <button
              className={
                toggle1
                  ? 'flex gap-2 py-2 text-white mt-8 px-4 rounded-3xl bg-[#ff4153] '
                  : 'gap-2 py-2 hidden text-white mt-8 px-4 rounded-3xl bg-[#ff4153] '
              }
            >
              Read More <MdOutlineNavigateNext />
            </button>
          </div>
        </div>
        <div
          // initial={{
          //   x: 100,
          //   opacity: 0,
          // }}
          // whileInView={{
          //   x: 0,
          //   opacity: 1,
          // }}
          // transition={{
          //   delay: 0.2,
          //   x: { type: 'spring' },
          //   opacity: { duration: 0.5 },
          //   ease: 'easeIn',
          //   duration: 1,
          // }}
          className="w-full h-[450px]  hover:shadow-lg py-7 duration-700 px-14 "
        >
          <div
            onMouseEnter={() => setToggle2(true)}
            onMouseLeave={() => setToggle2(false)}
            className="flex justify-center items-center flex-col text-center"
          >
            <div
              className={
                toggle2
                  ? 'text-white text-5xl duration-700 w-20 h-20 flex justify-center items-center rounded-full bg-black mb-8'
                  : 'text-black text-5xl w-20 h-20 flex justify-center items-center rounded-full  mb-8'
              }
            >
              <AiOutlineFilePdf />
            </div>
            <div className="text-[#ff4153] font-bold text-xl mb-3">
              Upload Resume
            </div>
            <div className="text-black">
              Ready to take the next step in your career? Our seamless resume
              upload feature makes it easier than ever to get noticed by top
              employers.
            </div>
            <button
              className={
                toggle2
                  ? 'flex gap-2 py-2 text-white mt-8 px-4 rounded-3xl bg-[#ff4153] '
                  : 'gap-2 py-2 hidden text-white mt-8 px-4 rounded-3xl bg-[#ff4153] '
              }
            >
              Read More <MdOutlineNavigateNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobProcess;
