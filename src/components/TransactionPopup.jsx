import React, { useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';

const TransactionPopup = ({ balance, actionType, closePopup }) => {
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTransaction = async () => {
    try {
        if(actionType==='Withdraw' && amount > balance){
            toast.error('Insufficient Funds')
            closePopup()
        }
      const response = await api.transaction({
        amount: Number(amount),
        type: actionType
      });

      if (response.status === 200) {
        toast.success(response.data.message); 
        closePopup(); 
      } else {
        toast.error(response.data.message);
        closePopup();
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      setErrorMessage('Transaction failed. Please try again.');
    }
  };


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{actionType} Transaction</h2>
        <p className="mb-4">Current Balance: {balance}</p>
        <p className="mb-4">Action: {actionType}</p>
        <input
          type="number"
          placeholder="Enter amount"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
            onClick={closePopup}
          >
            Close
          </button>
          <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={handleTransaction}
    >
      Submit
    </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPopup;
