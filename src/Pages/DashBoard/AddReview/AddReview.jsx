import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { ScrollRestoration } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic/useAxiosPublic";

const AddReview = () => {
  const axiosPublic = useAxiosPublic();

  const handleAddReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const img = form.photo.value;
    const location = form.countryName.value;
    const comment = form.description.value;
    const user = form.name.value;
    const rating = form.rating.value;

    const addReview = {
      comment,
      img,
      location,
      rating,
      user,
    };
    // console.log(addReview);
    axiosPublic
      .post("/add-testimonials", {
        addReview,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data?.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Thank You. Successfully Added Your Review",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      });
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(setLoading, 500, false);
  }, []);
  return loading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="w-full ">
      <Helmet>
        <title>Adventure Travel | Add Review</title>
      </Helmet>
      <div className="shadow-lg rounded-lg     border border-blue-400">
        {/* Heading */}
        <div className="mt-5 mb-8">
          <p className="text-center text-3xl font-semibold dark:text-white">
            Add Your Review Here
          </p>
        </div>
        {/* form */}
        <form onSubmit={handleAddReview}>
          <div className="flex gap-8 ">
            <div className="flex-1">
              <label className="block mb-2 dark:text-white" htmlFor="name">
                User Name
              </label>
              <input
                className="w-full p-2 border  rounded-md focus:outline-[#FF497C]"
                type="text"
                placeholder="User Name"
                id="name"
                name="name"
                required
              />

              <label
                className="block mb-2 mt-4 dark:text-white"
                htmlFor="countryName"
              >
                User Country Name
              </label>
              <input
                className="w-full p-2  border rounded-md focus:outline-[#FF497C]"
                type="text"
                placeholder="User Country Name"
                id="countryName"
                name="countryName"
                required
              />
            </div>
            {/* Right side */}
            <div className="flex-1">
              <label className="block mb-2 dark:text-white" htmlFor="photo">
                User PhotoURL
              </label>
              <input
                className="w-full p-2 border  rounded-md focus:outline-[#FF497C]"
                type="text"
                placeholder="User URL"
                id="photo"
                name="photo"
                required
              />
              <label
                className="block mb-2 mt-4 dark:text-white"
                htmlFor="rating"
              >
                Rating (Out of 5)
              </label>
              <input
                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                type="number"
                placeholder="e.g-1/2/3/4/5"
                id="rating"
                name="rating"
                required
              />
            </div>
          </div>
          <label
            className="block mt-4 mb-2 dark:text-white"
            htmlFor="description"
          >
            Comment
          </label>
          <textarea
            className="w-full p-2  border rounded-md focus:outline-[#FF497C]"
            type="text"
            placeholder="Add Your Comment"
            id="description"
            name="description"
            required
            cols="30"
            rows="5"
          ></textarea>
          <input
            className="px-4 w-full py-2 mt-4 rounded hover:bg-[#b4516d]  bg-[#7ad3da] duration-200 text-black cursor-pointer font-semibold"
            type="submit"
            value="Add Review"
          />
        </form>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default AddReview;
