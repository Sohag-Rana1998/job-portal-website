import { FaCalendar, FaShoppingCart, FaStar } from "react-icons/fa";

// import usePaymentHistory from '../../../hooks/usePaymentHistory';
import { FaPeopleGroup } from "react-icons/fa6";
import { IoLayersSharp } from "react-icons/io5";

// import useAllPayments from '../../../hooks/useAllPayments';
// import useMenuData from '../../../hooks/useMenuData';
// import useAllOrders from '../../../hooks/useAllOrders';
// import CustomBarChart from '../../../Components/Shared/Recharts/CustomBarChart';
// import PieCharts from '../../../Components/Shared/Recharts/PieCharts';
import useUsersData from "../../../Components/Hooks/useUsersData/useUsersData";
import useAuth from "../../../Components/Hooks/useAuth/useAuth";
import useJobsData from "../../../Components/Hooks/useJobsData/useJobsData";
// import useJobsData from '../../../Components/Hooks/useJobsData/useJobsData';

const AdminHome = () => {
  const { user } = useAuth();
  // const { paymentHistory } = usePaymentHistory();
  // console.log(paymentHistory);

  const { users } = useUsersData();
  const { data } = useJobsData();

  // const { payments } = useAllPayments();
  // const { menu } = useMenuData();
  // const { allOrders } = useAllOrders();

  // const orders = payments?.length;
  // const revenue = payments?.reduce(
  //   (total, order) => total + parseInt(order.price),
  //   0
  // );

  // console.log(allOrders);
  return (
    <div className="w-full mx-auto">
      <div>
        <h3 className="text-3xl font-semibold cinzel mb-4">
          Hi, Welcome Back!
        </h3>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3 mb-5">
        <div className="w-full h-[150px] bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] rounded-xl flex items-center justify-center p-4 ">
          <div className="text-white text-xl inter font-bold text-center">
            <div>
              <h3>{data?.length}</h3>
              <h3> Total Job</h3>
            </div>
          </div>
        </div>
        <div className="w-full h-[150px] bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] rounded-xl flex items-center justify-center p-4">
          <div className="text-white text-xl inter font-bold text-center ">
            <h3>{users?.length}</h3>
            <h3>Total Users</h3>
          </div>
        </div>

        <div className="w-full h-[150px] bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] rounded-xl flex items-center justify-center p-4">
          <div className="text-white text-xl inter font-bold text-center ">
            <h3>20</h3>
            <h3>Total Applicants</h3>
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
            <h3 className="text-3xl font-semibold cinzel mb-5">Activities</h3>
          </div>
          <div className="font-bold text-2xl flex items-center gap-2 mb-1 text-[#0088FE]">
            <FaShoppingCart />
            <p>Total Jobs: 16</p>
          </div>
          <div className="font-bold text-2xl flex items-center gap-2 mb-1 text-[#00C4A1]">
            <FaStar />
            <p>Reviews: 12</p>
          </div>
          <div className="font-bold text-2xl flex items-center gap-2 mb-1 text-[#FFBB28]">
            <FaCalendar />
            <p>Total Application:125</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
