// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMessage,
  FaPhone,
  FaPinterest,
  FaTwitter,
  FaVimeo,
} from 'react-icons/fa6';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';
import useAgentsData from '../../Components/Hooks/useAgentsData/useAgentsData';

export default function Slider() {
  const { data } = useAgentsData();
  console.log(data);
  // const colors = ['#006769', '#7469B6', '#03AED2', '#32012F', '#C40C0C'];

  return (
    <>
      <div className="container mt-8 mx-auto px-20 md:px-0 flex justify-center items-center">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper w-[60%] h-[450px] md:w-[50%] mx-auto md:h-[550px]"
        >
          {data &&
            data.map(agent => (
              <SwiperSlide
                key={agent._id}
                className={`bg-[#ff4153]  rounded-3xl p-0 md:p-5  shadow-lg `}
              >
                <Card className=" w-full rounded-2xl  ">
                  <div className="w-full rounded-2xl h-56 ">
                    <img
                      src={agent?.image_url}
                      alt="card-image"
                      className="w-full h-full rounded-t-2xl"
                    />
                  </div>
                  <CardBody>
                    <Typography variant="h5" className="mb-2">
                      {agent?.name}
                      <p className="text-sm">{agent?.designation}</p>
                    </Typography>
                    <div className="hidden md:block">
                      <Typography>{agent.description}</Typography>
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0 flex flex-col md:flex-row justify-between">
                    <div className="text-lg md:flex gap-3 hidden">
                      <FaFacebook className="cursor-pointer hover:scale-[120%] duration-500"></FaFacebook>
                      <FaInstagram className="cursor-pointer hover:scale-[120%] duration-500"></FaInstagram>
                      <FaTwitter className="cursor-pointer hover:scale-[120%] duration-500"></FaTwitter>
                      <FaLinkedin className="cursor-pointer hover:scale-[120%] duration-500"></FaLinkedin>
                      <FaPinterest className="cursor-pointer hover:scale-[120%] duration-500"></FaPinterest>
                      <FaVimeo className="cursor-pointer hover:scale-[120%] duration-500"></FaVimeo>
                    </div>
                    <div className="flex text-lg gap-3">
                      <FaMessage className="cursor-pointer hover:scale-[120%] duration-500"></FaMessage>
                      <FaPhone className="cursor-pointer hover:scale-[120%] duration-500"></FaPhone>
                    </div>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
