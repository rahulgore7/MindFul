import React, { useState } from "react";

const Box = ({ user, onDelete, onEdit }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fullName = `${user.firstName} ${user.lastName}`;
  const mobile = user.tel;
  const email = user.email;
  const options = { day: "numeric", month: "short" };
  const formattedDate = new Date(user.createdAt).toLocaleDateString(
    "en-US",
    options
  );
  const state = user.state;

  return (
    <div className="flex-shrink-0 w-72 mx-2">
      <div className="flex flex-col pb-2 overflow-auto">
        <div
          className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
          draggable="true"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-0 right-0 mt-8 bg-white border border-gray-200 p-2 rounded shadow">
              <div className="mb-2">
                <button
                  className="text-red-500"
                  onClick={() => onDelete(user._id)}
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  className="text-red-500"
                  onClick={() => onEdit(user._id)}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
          <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
            {fullName}
          </span>
          <h4 className="mt-3 text-sm font-medium">{mobile}</h4>
          <h4 className="mt-3 text-sm font-medium">{email}</h4>
          <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-300 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1 leading-none">{formattedDate}</span>
            </div>
            <div className="relative flex items-center ml-4">
              <svg
                className="w-4 h-4 text-gray-300 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1a5 5 0 014.95 4.17 9 9 0 001.68 2.83A9 9 0 0018 10c0 5.25-4.43 9-9 9s-9-3.75-9-9a9 9 0 001.37-1.5A9 9 0 005.05 5.17 5 5 0 0110 1zm0 2a3 3 0 00-3 3c0 2.16.99 5.36 3 9.77 2.01-4.41 3-7.61 3-9.77a3 3 0 00-3-3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1 leading-none">{state}</span>
            </div>

            <img
              className="w-6 h-6 ml-auto rounded-full"
              src="https://randomuser.me/api/portraits/women/26.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
