import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Box from "./Box";
import EditProfile from "./EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser, getUserById } from "../actions/userActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  const [editing, setEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDeleteUser = async (id) => {
    try {
      await dispatch(deleteUser(id));
      // No need to update state manually, Redux will take care of it
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditClick = (userId) => {
    setEditing(true);
    setEditUserId(userId);
    dispatch(getUserById(userId));
  };

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Navbar setSearchResults={handleSearch} />
        <div className="px-10 mt-6">
          <h1 className="text-2xl font-bold">Team</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center px-10 mt-4 space-x-6 overflow-auto">
          {(searchResults.length > 0 ? searchResults : users).map((user) => (
            <Box
              key={user._id}
              user={user}
              onDelete={() => handleDeleteUser(user._id)}
              onEdit={() => handleEditClick(user._id)}
            />
          ))}
          {searchResults.length === 0 && users.length === 0 && (
            <p className="text-lg font-semibold text-gray-800">
              No Users Found
            </p>
          )}
        </div>
        <div className="flex-shrink-0 w-6"></div>
        {editing && (
          <EditProfile userId={editUserId} onCancel={() => setEditing(false)} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
