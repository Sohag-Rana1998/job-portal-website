// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

const Testimonials = () => {
  const img1 = 'https://i.postimg.cc/wT4ckLzs/Testimonial-Image5.png';
  const img2 = 'https://i.postimg.cc/Hx37k1s7/Testimonial4.png';
  const img3 = 'https://i.postimg.cc/3rSvMhcs/testimonial-image3.png';
  const img4 = 'https://i.postimg.cc/DwNz5QBH/Testimonial-Images6.png';
  const img5 = 'https://i.postimg.cc/wMZ59Y0Q/testimonial-images.png';

  return (
    <div className=" ">
      <div>
        <h1 className="text-3xl font-bold text-center text-gray-800 capitalize md:text-5xl ">
          What Our <span className="text-[#ff4153]">Candidates</span> Say
        </h1>

        <p className="max-w-2xl mx-auto mt-2 mb-2 text-center text-gray-500 ">
          Discover the voices of success! Our candidates speak for themselves
          about their transformative experiences
        </p>
      </div>
      <div className="w-full  flex justify-between items-center">
        <div>
          <div className="h-[450px]">
            <img
              className="w-full h-full rounded-xl"
              src="https://i.postimg.cc/d1yPxkjn/test-img.webp"
              alt=""
            />
          </div>
        </div>
        <div className="w-[50%] ">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Slide
                image={img1}
                text="This platform is fantastic! It's incredibly user-friendly, and I was pleasantly surprised to find my dream job within just a few weeks of signing up. The job listings are updated regularly, which made the process smooth and efficient. I highly recommend it to anyone searching for their next career move."
                name="John Doe"
                designation="Software Engineer"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Slide
                image={img2}
                text="Overall, my experience with this job
              portal was positive. While there are plenty of job listings
              available, some seem outdated or irrelevant to my search criteria.
              However, I still managed to find a few promising opportunities
              that align with my skills and interests. With a bit of refinement,
              this could become an excellent resource for job seekers."
                name="Jane Smith "
                designation="Marketing Manager"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Slide
                image={img3}
                text="My experience with this website was decent, but there is room for improvement. The search functionality feels a bit clunky, and it can be challenging to filter through the numerous listings effectively. Adding more refined search options would greatly enhance the user experience"
                name="Sarah Rahman"
                designation="Human Resources Professional"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Slide
                image={img4}
                text="I can't speak highly enough of this portal! It played a significant role in helping me secure my current job. The email notifications for new listings were invaluable, and the application process was straightforward. I appreciate the user-friendly interface and the platform's effectiveness in connecting job seekers with relevant opportunities."
                name="Emily Chen"
                designation="Graphic Designer"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Slide
                image={img5}
                text="I had an exceptional experience with this job portal! The support team was incredibly helpful and responsive throughout my job search journey. The platform helped me find a job that aligns perfectly with my skills and interests. I highly recommend it to anyone looking for their next career opportunity."
                name=" Sarah Thompson"
                designation="Financial Analyst"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
