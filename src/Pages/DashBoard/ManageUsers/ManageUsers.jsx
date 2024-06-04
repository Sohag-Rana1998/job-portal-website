import { RiDeleteBin5Line } from 'react-icons/ri';

// import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import { FaPeopleGroup } from 'react-icons/fa6';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure/useAxiosSecure';
import useUsersData from '../../../Components/Hooks/useUsersData/useUsersData';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { users, refetch } = useUsersData();
  console.log(users);
  const handleMakeAdmin = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want  to make admin!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/admin/${id}`).then(data => {
          if (data.data.modifiedCount > 0) {
            Swal.fire({
              title: 'Updated!',
              text: 'Your Request Has Been Successfully Modified.',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            });
          }
          refetch();
        });
      }
    });
  };

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/${id}`).then(data => {
          console.log(data.data);
          if (data?.data?.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
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
    <div className="w-full px-10 mt-5">
      <div className="w-full">
        {/* <SectionTitle
          heading={'MANAGE ALL USERS'}
          subheading={'How many??'}
        ></SectionTitle> */}
      </div>
      <div className="w-full text-3xl mt-5 font-bold cinzel flex justify-evenly items-center">
        <div>All Users: </div>
        <div>Total Users: {users?.length}</div>
      </div>

      <div className="mt-5">
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
                      {user.role === 'admin' ? (
                        'Admin'
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
