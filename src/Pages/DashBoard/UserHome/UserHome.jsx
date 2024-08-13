import {
  FaCalendar,
  FaSave,
  FaShoppingCart,
  FaStar,
  FaWallet,
} from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa6";
import useAuth from "../../../Components/Hooks/useAuth/useAuth";
import useSavedJobs from "../../../Components/Hooks/useSavedJobs/useSavedJobs";
import useAppliedJobsData from "../../../Components/Hooks/useAppliedJobsData/useAppliedJobsData";

// import usePaymentHistory from '../../../hooks/usePaymentHistory';

const UserHome = () => {
  const filter = "";
  const { savedJobs, refetch, isLoading } = useSavedJobs(filter);
  const { data } = useAppliedJobsData(filter);
  // const { paymentHistory, refetch } = usePaymentHistory();
  // console.log(paymentHistory);
  const { user } = useAuth();

  // const totalOrder = paymentHistory?.length;
  // const totalPayment = paymentHistory?.reduce(
  //   (total, order) => total + parseInt(order.price),
  //   0
  // );
  // const totalShop = paymentHistory?.reduce(
  //   (total, order) => total + parseInt(order.menuId.length),
  //   0
  // );

  // console.log(totalShop);
  return (
    <div className="w-full mx-auto">
      <div>
        <h3 className="text-3xl font-semibold  mb-4">Hi, Welcome Back!</h3>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-5">
        <div className="w-full h-[150px] bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] rounded-xl flex items-center justify-center">
          <div className="text-white gap-3  flex items-center text-2xl inter font-extrabold">
            <FaSave className="text-white text-3xl " />
            <div className="text-center">
              <h3>{savedJobs?.length}</h3>
              <h3>Saved Jobs</h3>
            </div>
          </div>
        </div>
        <div className="w-full h-[150px] bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] rounded-xl flex items-center justify-center gap-3 ">
          <FaCheckDouble className="text-white text-3xl" />
          <div className="text-white text-center text-2xl inter font-extrabold ">
            <h3>{data?.length}</h3>
            <h3>Apply Jobs</h3>
          </div>
        </div>
        <div className="w-full h-[150px] bg-gradient-to-r from-[#FE4880] to-[#FECDE9] rounded-xl flex items-center justify-center gap-3 ">
          <FaStar className="text-white text-3xl" />
          <div className="text-white text-center text-2xl  font-extrabold">
            <h3>0</h3>
            <h3>Review Add</h3>
          </div>
        </div>
      </div>
      <div className="w-full flex-col md:flex-row flex divide-x-4 divide-[#D1A054] divide-solid bottom-2 ">
        <div className="bg-[#FFEDD5] w-full h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-32 mb-4">
              <img
                className="w-full h-full rounded-full"
                src={user?.photoURL}
                alt=""
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold cinzel">{user?.displayName}</h3>
            </div>
          </div>
        </div>

        <div className="bg-[#FEF9C3] w-full h-[400px] p-5 md:p-14">
          <div className="">
            <h3 className="text-3xl font-semibold cinzel mb-5">
              Your Activities
            </h3>
          </div>
          <div className="font-bold text-2xl flex items-center gap-2 mb-1 text-[#0088FE]">
            <FaSave />
            <h3>{savedJobs?.length}</h3>
          </div>
          <div className="font-bold text-2xl flex items-center gap-2 mb-1 text-[#FFBB28]">
            <FaCheckDouble />
            <h3>{data?.length}</h3>
          </div>
          <div className="font-bold text-2xl flex items-center gap-2 mb-1 text-[#00C4A1]">
            <FaStar />
            <p>Reviews: 0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
