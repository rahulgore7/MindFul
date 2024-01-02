import React, { useState } from "react";
import { logout } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setSearchResults }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      history("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProfileClick = () => {
    history("/profile");
  };

  const handleAddUserClick = () => {
    history("/addUser");
  };

  const handleOnTeamClick = () => {
    history("/");
  };

  const handleOnLogoClick = () => {
    history("/");
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    try {
      const response = await fetch(
        `https://backend-roan-nu.vercel.app/api/v1/search/${key}`
      );
      if (response.ok) {
        const result = await response.json();
        setSearchResults(result.users);
      } else {
        console.error("Search request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <svg
        className="w-8 h-8 text-indigo-600 stroke-current cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={handleOnLogoClick}
      >
        {/* ... (your SVG path) */}
      </svg>
      <input
        className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
        type="search"
        placeholder="Search for anything…"
        onChange={searchHandle}
      />
      <div className="ml-10">
        <button
          className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
          onClick={handleOnTeamClick}
        >
          Team
        </button>
        <button
          className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
          onClick={handleAddUserClick}
        >
          Add User
        </button>
      </div>
      <div className="ml-auto relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer"
        >
          <img
            src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
            alt=""
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
              onClick={handleProfileClick}
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
