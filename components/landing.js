import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import SignUp from "./SignUp";
import axios from "axios";
import { useRouter } from "next/navigation";

function Landing() {
    const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [renderSignup, setRenderSignup] = useState(false);
  const handleLogin = async() => {
    const response = await axios.get("http://localhost:3000/api/getallusers")
    for (let i = 0; i < response.data.length; i++) {
        const element = response.data[i];
        if (email == element.email && password == element.password) {
            localStorage.setItem("data", JSON.stringify(element));
            localStorage.setItem("loggedIn", true)
          router.push('/')
        }
        
    }
  };
  const RedirSignUp = () => {
    setRenderSignup(true);
  };
  return (
    <main>
      {!renderSignup && (
        <div className="flex flex-col justify-center h-screen sm:mx-5 mx-auto items-center">
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8  w-full shadow-lg">
            <h2 className="text-gray-900 text-2xl font-medium title-font my-2 mb-5">
              Login
            </h2>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-lg text-black">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 rounded-lg"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-lg text-black"
              >
                Password
              </label>
              <input
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
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 my-2 rounded text-lg text-center w-full"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="text-lg my-2 text-center text-blue-600">
              Forgot Password?
            </p>
            <hr />
            <button
              className="text-white bg-green-500 border-0 py-2 px-10 mx-auto flex rounded text-lg my-4"
              onClick={RedirSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
      {renderSignup && <SignUp/>}
    </main>
  );
}

export default Landing;
