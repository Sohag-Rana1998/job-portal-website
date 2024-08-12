import PropTypes from 'prop-types';

const SlideOfTestimonials = ({ review }) => {
  return (
    <div className="w-full  p-10 text-black">
      <div className=" w-full h-full">
        <div className="text-center p-5 rounded-xl box bg-gray-300 h-[400px] lg:h-[480px] xl:h-[400px]  flex-col flex  items-center">
          <div className="flex justify-center">
            <img
              className="h-10 w-10"
              src="https://i.postimg.cc/xCfnh8DK/png-transparent-quotation-mark-apostrophe-computer-icons-quotation-text-number-sign-thumbnail.png"
              alt=""
            />
          </div>
          <h1 className="hidden md:block ">{review?.review.slice(0, 380)}</h1>
          <h1 className=" block md:hidden">{review?.review?.slice(0, 150)}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 ">
            <img className="w-full h-full rounded-full" src={review?.image} alt="" />
          </div>

          <div>
            <h2 className="font-bold">{review?.name}</h2>
            <h2 className="text-sm">{review?.designation}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

SlideOfTestimonials.propTypes = {
  review: PropTypes.object,
 
};

export default SlideOfTestimonials;
