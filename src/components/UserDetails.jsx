// TransactionsPage.jsx
import React, { useEffect, useState } from 'react';
import Transaction from './Transaction';
import api from '../api';
import toast, {Toaster} from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState({name:'',userId:"",transactions:[],balance:0});
  const { userId } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.getTransactionsOfUser(userId)
            console.log(response.data)
            if(response.status===200) setUser(response.data);
          if(response.status !== 200) toast.error(response.data.message)
        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error('Something went wrong!')
        }
      };
  
      fetchData();
  },[userId])

  return (
    <div className="container mx-auto p-4">
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <h1 className="text-3xl font-bold mb-4">Name : {user.name}</h1>
      <h3 className="text-3xl font-bold mb-4">User Id : {user.userId}</h3>
      {/* Deposit and Withdraw buttons */}
      <div className="flex justify-between items-center border-b py-2">
        <span>Balance : {user.balance}</span>
        <div className="space-x-2">
        </div>
      </div>

      {/* Display transaction records*/}
      {user.transactions.length > 0 ? (
        <table className="w-full mt-4">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Transaction ID</th>
              <th className="py-2 text-left">Action</th>
              <th className="py-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through transaction records and display each transaction */}
            {user.transactions.map((record) => (
              <Transaction
                key={record._id}
                transactionId={record._id}
                actionType={record.type}
                amount={record.amount}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-4 text-2xl font-bold">No Transactions</p>
      )}
    </div>
  );
};

export default UserDetails;
