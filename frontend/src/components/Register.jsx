import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const history = useNavigate();

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
      "https://mindful-ccdkp8tu0-rahulgore7.vercel.app/api/v1/checkRegistration",
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

    const response = await fetch("https://mindful-ccdkp8tu0-rahulgore7.vercel.app/api/v1/register", {
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
      history("/login");
    }
  }

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>
          <p className="text-white mt-1">
            The most popular peer to peer lending at SEA
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={registerUser}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Register</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome</p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
              
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              
              />
            </svg>

            <input
              className="pl-2 outline-none border-none"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name=""
              id=""
              placeholder="First Name"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
              
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name=""
              id=""
              placeholder="Last Name"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
           
        
                
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
              placeholder="Email Address"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
            
             
                
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              name="mobile"
              id="mobile"
              placeholder="Mobile Number"
            />
          </div>

          <div className="flex items-center mb-4">
            <span className="mr-2 text-gray-800 font-bold">Gender:</span>
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
              <span className="ml-1">Others</span>
            </label>
          </div>

          {/* How did you hear about this? Checkboxes */}
          {/* How did you hear about this? Checkboxes */}
          <div className="flex items-center mb-4">
            <span className="mr-2 text-gray-800 font-bold">
              How Did You Hear About Us?
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
            <label className="mr-4">
              <input
                type="radio"
                name="Other"
                value="Other"
                onChange={(e) => setHowDidYouHear(e.target.value)}
              />
              <span className="ml-1">Other</span>
            </label>
          </div>

          {/* State Auto Suggested Search Textbox */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <select
              className="outline-none border-none w-full"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="" disabled  hidden>
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

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
           
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
               
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            value="Register"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Register
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => history("/login")}
              className="text-indigo-600 underline cursor-pointer"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
