import PropTypes from 'prop-types';

const SlideOfTestimonials = ({ image, text, name, designation }) => {
  return (
    <div className="w-full  p-10 text-black">
      <div className=" w-full h-full">
        <div className="text-center p-10 rounded-xl box bg-gray-100 h-[400px] lg:h-[480px] xl:h-[400px]  flex-col flex  items-center">
          <h1 className="hidden md:block ">{text}</h1>
          <h1 className=" block md:hidden">{text?.slice(0, 150)}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 ">
            <img className="w-full h-full rounded-full" src={image} alt="" />
          </div>

          <div>
            <h2>{name}</h2>
            <h2>{designation}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

SlideOfTestimonials.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string,
  designation: PropTypes.string,
};

export default SlideOfTestimonials;
