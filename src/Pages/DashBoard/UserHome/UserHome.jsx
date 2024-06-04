import {
  FaCalendar,
  FaHome,
  FaPhone,
  FaShoppingCart,
  FaStar,
  FaWallet,
} from 'react-icons/fa';
import useAuth from '../../../Components/Hooks/useAuth/useAuth';

// import usePaymentHistory from '../../../hooks/usePaymentHistory';

const UserHome = () => {
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
            <FaWallet className="text-white text-3xl" />
            <div className="">
              <h3>{5}</h3>
              <h3>Saved Jobs</h3>
            </div>
          </div>
        </div>
        <div className="w-full h-[150px] bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] rounded-xl flex items-center justify-center gap-3 ">
          <FaHome className="text-white text-3xl" />
          <div className="text-white text-2xl inter font-extrabold">
            <h3>{3}</h3>
            <h3>Apply Jobs</h3>
          </div>
        </div>
        <div className="w-full h-[150px] bg-gradient-to-r from-[#FE4880] to-[#FECDE9] rounded-xl flex items-center justify-center gap-3 ">
          <FaStar className="text-white text-3xl" />
          <div className="text-white flex flex-col items-center text-2xl inter font-extrabold">
            <h3>2</h3>
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
            <FaShoppingCart />
            <p>Saved Jobs: 3</p>
          </div>
          <div className="font-bold text-2xl flex items-center gap-2 mb-1 text-[#00C4A1]">
            <FaStar />
            <p>Reviews: 02</p>
          </div>
          <div className="font-bold text-2xl flex items-center gap-2 mb-1 text-[#FFBB28]">
            <FaCalendar />
            <p>Applied Jobs: 01</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
