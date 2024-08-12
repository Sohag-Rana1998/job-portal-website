import { RiDeleteBin5Line } from "react-icons/ri";

// import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import Swal from "sweetalert2";
import { FaPeopleGroup } from "react-icons/fa6";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure/useAxiosSecure";
import useUsersData from "../../../Components/Hooks/useUsersData/useUsersData";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { users, refetch } = useUsersData();
  console.log(users);
  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want  to make admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/admin/${id}`).then((data) => {
          if (data.data.modifiedCount > 0) {
            Swal.fire({
              title: "Updated!",
              text: "Your Request Has Been Successfully Modified.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          refetch();
        });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/${id}`).then((data) => {
          console.log(data.data);
          if (data?.data?.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          refetch();
        });
      }
    });
  };

  return (
    <div className="w-full  ">
      <div className="w-full">
        <div className=" rounded-t-xl md:h-40  w-full    bg-[url(https://i.postimg.cc/pV7qZCT6/career-banner.jpg)] bg-center bg-no-repeat bg-cover  relative">
          <div className=" inset-0 text-white flex  items-center h-full absolute rounded-t-xl bg-gradient-to-r from-gray-900 ">
            <h2 className="pl-4 md:pl-20 text-3xl font-bold">
              Total Users: {users?.length}
            </h2>
          </div>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}

            <thead>
              <tr className="bg-[#7ad3da] rounded-t-3xl">
                <th className="p-5 ">No</th>

                <th>User Name</th>
                <th>User Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* row 1 */}
              {users &&
                users?.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>

                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td className="">
                      {user.role === "admin" ? (
                        "Admin"
                      ) : (
                        <div
                          onClick={() => handleMakeAdmin(user._id)}
                          className="bg-[#D1A054] btn w-20 flex justify-center items-center"
                        >
                          <FaPeopleGroup className="text-xl text-white" />
                        </div>
                      )}
                    </td>
                    <th>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn bg-red-600 "
                      >
                        <RiDeleteBin5Line className="text-white text-xl" />
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
