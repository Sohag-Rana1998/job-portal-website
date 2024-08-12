// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
// Import Swiper styles
import 'swiper/css';

// import required modules
import { Autoplay } from 'swiper/modules';
import SlideOfTestimonials from './SlideOfTestimonials';
import { useRef, useState } from 'react';
const Testimonials = () => {
  const [toggle, setToggle] = useState(true);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  console.log(toggle);

  const data = [
    {
      image: 'https://i.postimg.cc/wT4ckLzs/Testimonial-Image5.png',
      name: 'John Doe',
      designation: 'Software Engineer',
      review:
        "This platform is fantastic! It's incredibly user-friendly, and I was pleasantly surprised to find my dream job within just a few weeks of signing up. The job listings are updated regularly, which made the process smooth and efficient. I highly recommend it to anyone searching for their next career move.",
    },
    {
      image: 'https://i.postimg.cc/Hx37k1s7/Testimonial4.png',
      name: 'Michael Smith',
      designation: 'Marketing Manager',
      review:
        'Overall, my experience with this job portal was positive. While there are plenty of job listings  available, some seem outdated or irrelevant to my search criteria. However, I still managed to find a few promising opportunities that align with my skills and interests. With a bit of refinement, this could become an excellent resource for job seekers.',
    },
    {
      image: 'https://i.postimg.cc/3rSvMhcs/testimonial-image3.png',
      name: 'Sarah Rahman',
      designation: 'Human Resources Professional',
      review:
        'My experience with this website was decent, but there is room for improvement. The search functionality feels a bit clunky, and it can be challenging to filter through the numerous listings effectively. Adding more refined search options would greatly enhance the user experience',
    },
    {
      image: 'https://i.postimg.cc/DwNz5QBH/Testimonial-Images6.png',
      name: 'Emily Chen',
      designation: 'UX Designer',
      review:
        "I can't speak highly enough of this portal! It played a significant role in helping me secure my current job. The email notifications for new listings were invaluable, and the application process was straightforward. I appreciate the user-friendly interface and the platform's effectiveness in connecting job seekers with relevant opportunities.",
    },
    {
      image: 'https://i.postimg.cc/wMZ59Y0Q/testimonial-images.png',
      name: 'Sophia Wilson',
      designation: 'HR Specialist',
      review:
        'I had an exceptional experience with this job portal! The support team was incredibly helpful and responsive throughout my job search journey. The platform helped me find a job that aligns perfectly with my skills and interests. I highly recommend it to anyone looking for their next career opportunity.',
    },
  ];

  return (
    <div className="max-w-7xl container mx-auto overflow-hidden">
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
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 capitalize md:text-5xl ">
          What Our <span className="text-[#ff4153]">Candidates</span> Say
        </h1>

        <p className="max-w-2xl mx-auto mt-2 mb-2 text-center text-gray-500 ">
          Discover the voices of success! Our candidates speak for themselves
          about their transformative experiences
        </p>
      </motion.div>
      <div className="w-full  flex flex-col lg:flex-row  justify-between gap-5 items-center">
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
            x: { type: 'spring' },
            opacity: { duration: 1 },
            ease: 'easeIn',
            duration: 1,
          }}
          className="w-full md:w-[45%]"
        >
          <div className="h-[450px]">
            <img
              className="w-full h-full rounded-xl"
              src="https://i.postimg.cc/d1yPxkjn/test-img.webp"
              alt=""
            />
          </div>
        </motion.div>
        <motion.div
          onMouseEnter={() => setToggle(false)}
          onMouseLeave={() => setToggle(true)}
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
            x: { type: 'spring' },
            opacity: { duration: 1 },
            ease: 'easeIn',
            duration: 1,
          }}
          className="w-full lg:w-[50%]"
        >
          <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
          >
            {data?.map(review => (
              <SwiperSlide key={review.name}>
                <SlideOfTestimonials
                  review={review}
                />
              </SwiperSlide>
            ))}

            {toggle ? (
              <div className="autoplay-progress hidden" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            ) : (
              <></>
            )}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
