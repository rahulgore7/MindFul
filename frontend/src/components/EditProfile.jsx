import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../actions/userActions";

const EditProfile = ({ onCancel }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tel: "",
    email: "",
    gender: "",
    city: "",
    state: "",
  });
  useEffect(() => {
    // Populate the form data with the current user details
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      tel: user.tel,
      email: user.email,
      gender: user.gender,
      city: user.city,
      state: user.state,
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== undefined)
    );

    // Dispatch the action to update the user profile
    dispatch(editUser(user._id, filteredFormData));
    window.location.reload();
  };
  const handleCancel = (e) => {
    e.preventDefault(); // Prevent the default form submission
    onCancel();
  };

  return (
    <form
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75"
      onSubmit={handleSubmit}
    >
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        {/* Editable fields */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Mobile:
          </label>
          <input
            type="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Email:
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex items-center mb-4">
          <span className="mr-2 text-gray-800 font-bold">Gender:</span>
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            <span className="ml-1">Male</span>
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            <span className="ml-1">Female</span>
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Others"
              checked={formData.gender === "Others"}
              onChange={handleChange}
            />
            <span className="ml-1">Others</span>
          </label>
        </div>

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <select
            className="outline-none border-none w-full"
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="" disabled selected hidden>
              Select State
            </option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
            {/* Add more states as needed */}
          </select>
        </div>

        {/* Add more editable fields as needed */}

        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Save Changes
          </button>
          <button
            className="ml-2 text-gray-600 px-4 py-2 rounded hover:text-gray-700"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
