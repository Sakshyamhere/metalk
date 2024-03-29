import axios from "axios";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("")
  const [phonenumber, setPhonenumber] = useState("");
  const [userExist, setUserExist] = useState(false);
  const data = { fullname, email, password, phonenumber };
  const handleSignUp = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:3000/api/adduser", {
        data,
      })
      .then(function (response) {
        if(response.status == 200) {
          localStorage.setItem("data", JSON.stringify(data));
          localStorage.setItem("loggedIn", true)
         window.location.href = '/'
        }
      })
      .catch(function (error) {
        if (error.response.status == 409) {
         
          setUserExist(true);
          setTimeout(() => {
            setUserExist(false)
          }, "1000");
        }
      });
  };
  return (
    <main>
    <div className="flex flex-col mx-auto justify-center items-center h-screen sm:mx-5 ">
      <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8  w-full shadow-lg">
        {userExist && (
          <span className="text-center">
            <p className="text-red-300 text-xl bg-red-900 p-2 rounded-md">
              Email is already used.
            </p>
          </span>
        )}
        <h2 className="text-gray-900 text-2xl font-medium title-font my-2 mb-5">
          Sign Up
        </h2>
        <div className="relative mb-4">
          <label htmlFor="full-name" className="leading-7 text-lg text-black">
            Full Name
          </label>
          <input
          required
            type="text"
            id="full-name"
            name="full-name"
            className="w-full p-3 rounded-lg"
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-lg text-black">
            Email
          </label>
          <input
          required
            type="email"
            id="email"
            name="email"
            className="w-full p-3 rounded-lg"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-lg text-black">
            Password
          </label>
          <input
          required
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-full p-3 rounded-lg"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length > 0 && (
            <span>
              {!showPassword ? (
                <FaRegEyeSlash
                  onClick={() => setShowPassword(true)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer my-3"
                />
              ) : (
                <FaRegEye
                  onClick={() => setShowPassword(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer my-3"
                />
              )}
            </span>
          )}
        </div>
        <div className="relative mb-4">
        <input
        required
            type={showPassword ? "text" : "password"}
            id="cnfrmpassword"
            name="password"
            className="w-full p-3 rounded-lg"
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          {password.length > 0 && (
            <span>
              {!showPassword ? (
                <FaRegEyeSlash
                  onClick={() => setShowPassword(true)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer my-3"
                />
              ) : (
                <FaRegEye
                  onClick={() => setShowPassword(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer my-3"
                />
              )}
            </span>
          )}
        </div>
        <div className="relative mb-4">
          <label htmlFor="number" className="leading-7 text-lg text-black">
            Phone Number
          </label>
          <input
          required
            type="number"
            id="number"
            name="number"
            min={1000000}
            max={999999999999999}
            className="w-full p-3 rounded-lg"
            placeholder="Enter your phone number"
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>
        {password == confirmpassword && phonenumber.length != 0 && password.length!=0 && fullname.length !=0 && email.length !=0 ?
        <button
        className={`text-white bg-indigo-500 border-0 py-2 px-8  rounded text-lg`}
        type="button"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
      :
      <button
          className={`text-white bg-indigo-500 border-0 py-2 px-8  rounded text-lg disabled:opacity-10`}
          type="button"
          disabled
        >
          Sign Up
        </button>
        }
        
      </div>
    </div>
    </main>
  );
}

export default SignUp;
