// Transaction.jsx
import React from 'react';

const Transaction = ({ transactionId, actionType, amount }) => {
  // Determine color theme based on actionType
  const colorTheme = actionType === 'Deposit' ? 'text-green-600' : 'text-red-600';

  return (
    <tr className="border-b">
      <td className="py-2">{transactionId}</td>
      <td className={`py-2 ${colorTheme}`}>{actionType}</td>
      <td className={`py-2 ${colorTheme}`}>{amount}</td>
    </tr>
  );
};

export default Transaction;
