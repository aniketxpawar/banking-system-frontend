import React,{useState, useEffect} from 'react';
import UserCard from './UserCard'; // Import UserCard component
import api from '../api'
import toast, {Toaster} from 'react-hot-toast';

const UserList = () => {
  const [users,setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
        try {
          // Fetch balance
          const response = await api.getUsers();
          setUsers(response.data);
          if(response.status !== 200) toast.error(response.data.message)

        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error('Something went wrong!')
        }
      };
  
      fetchData();
  },[])

  return (
    <div className="min-h-screen bg-blue-50">
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-3xl font-bold text-black">Users</h1>
        </div>
        <div className="flex flex-wrap gap-4">
          {users.length > 0 ? users.map((user) => (
            <div key={user.id} className="w-1/3">
              <UserCard
                id={user._id}
                name={user.name}
                balance={user.balance}
                className="w-full bg-white rounded-md p-4"
              />
            </div>
          ))
          :
          (<p className="text-center mt-4 text-2xl font-bold">No Users</p>)
          }
        </div>
      </div>
    </div>
  );
};

export default UserList;
