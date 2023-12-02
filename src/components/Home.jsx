// TransactionsPage.jsx
import React, { useEffect, useState } from 'react';
import Transaction from './Transaction'; // Import the Transaction component
import TransactionPopup from './TransactionPopup';
import api from '../api';
import toast, {Toaster} from 'react-hot-toast';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactionRecords, setTransactionRecords] = useState([]);
  const [popupActionType,setPopupActionType] = useState('')

  useEffect(() => {
    const fetchData = async () => {
        try {
          // Fetch balance
          const balanceResponse = await api.getBalance();
          setBalance(balanceResponse.data.balance);
          if(balanceResponse.status !== 200) toast.error(balanceResponse.data.message)
  
          // Fetch transactions
          const transactionsResponse = await api.getTransactions();
          setTransactionRecords(transactionsResponse.data);
          if(transactionsResponse.status !== 200) toast.error(transactionsResponse.data.message)
        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error('Something went wrong!')
        }
      };
  
      fetchData();
  },[showPopup])

  const handleDepositWithdraw = (actionType) => {
    setShowPopup(true);
    setPopupActionType(actionType)
  };

  return (
    <div className="container mx-auto p-4">
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>
      {/* Deposit and Withdraw buttons */}
      <div className="flex justify-between items-center border-b py-2">
        <span>Balance : {balance}</span>
        <div className="space-x-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleDepositWithdraw( 'Deposit')}
          >
            Deposit
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => handleDepositWithdraw( 'Withdraw')}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Display transaction records*/}
      {transactionRecords.length > 0 ? (
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
            {transactionRecords.map((record) => (
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

      {/* Popup for Deposit/Withdraw */}
      {showPopup && (
        <TransactionPopup
          balance={balance}
          actionType={popupActionType}
          closePopup={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Home;
