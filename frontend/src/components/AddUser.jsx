import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";

const AddUser = ({}) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [gender, setGender] = useState("");
  const [howDidYouHear, setHowDidYouHear] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    const checkResponse = await fetch(
      "https://backend-roan-nu.vercel.app/api/v1/checkRegistration",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          tel,
        }),
      }
    );
    const checkData = await checkResponse.json();
    if (!checkData.success) {
      // Display an alert or handle the error message from the server
      alert("Error checking registration. Please try again.");
      return;
    }
    if (checkData.emailExists) {
      alert("Email is already registered. Please use a different email.");
      return;
    }
    if (checkData.telExists) {
      alert("Mobile is already registered. Please use a different email"); // Display the error message from the server
      return;
    }

    const response = await fetch("https://backend-roan-nu.vercel.app/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        tel,
        email,
        password,
        gender,
        howDidYouHear,
        city,
        state,
      }),
    });

    const data = await response.json();

    if (data.success) {
      history("/");
    }
  }
  const handleCancel = (e) => {
    e.preventDefault(); // Prevent the default form submission
    history("/");
  };

  return (
    <>
      <Dashboard />
      <form
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75"
        onSubmit={registerUser}
      >
        <div className="bg-white p-8 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Add New User</h2>

          {/* Editable fields */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-1">
              First Name:
            </label>
            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-1">
              Last Name:
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name=""
              id=""
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-1">
              Mobile:
            </label>
            <input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              name="mobile"
              id="mobile"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-1">
              Email:
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex items-center mb-4">
            <span className="mr-2 text-gray-800 font-bold">Gender :</span>
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
              />
              <span className="ml-1">Male</span>
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
              />
              <span className="ml-1">Female</span>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Others"
                onChange={(e) => setGender(e.target.value)}
              />
              <span className="ml-1">Other</span>
            </label>
          </div>
          <div className="flex items-center mb-4">
            <span className="mr-2 text-gray-800 font-bold">
              How Did You Hear About Us ?
            </span>
            <label className="mr-4">
              <input
                type="radio"
                name="linkedin"
                value="LinkedIn"
                onChange={(e) => setHowDidYouHear(e.target.value)}
              />
              <span className="ml-1">LinkedIn</span>
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="jobPortal"
                value="jobPortal"
                onChange={(e) => setHowDidYouHear(e.target.value)}
              />
              <span className="ml-1">Job Portal</span>
            </label>
            <label>
              <input
                type="radio"
                name="Other"
                value="Other"
                onChange={(e) => setHowDidYouHear(e.target.value)}
              />
              <span className="ml-1">Other</span>
            </label>
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <select
              className="outline-none border-none w-full"
              value={state}
              onChange={(e) => setState(e.target.value)}
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
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-1">
              Password :
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
              placeholder="Password"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Add more editable fields as needed */}

          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              type="submit"
              value="Register"
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
    </>
  );
};

export default AddUser;
