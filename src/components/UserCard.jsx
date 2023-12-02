import React from 'react';

const UserCard = ({ id, name, balance }) => {
  return (
    <a href={`/user/${id}`}>
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">User ID:</span> {id}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Balance:</span> {balance}
        </p>
      </div>
    </div>
    </a>
  );
};

export default UserCard;
