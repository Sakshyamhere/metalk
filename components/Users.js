import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function Users(props) {
  const [users, setUsers] = useState([]);
  const [useremail, setUseremail] = useState('')
  const [getuser, setGetuser] = useState({});
  const [showuser, setShowuser] = useState(false);
  useEffect(() => {
    setUseremail(localStorage.getItem("data").email);
    fetchUser()
  }, []);
  const fetchUser = async () => {
    const resusers = await axios.get(`http://localhost:3000/api/getallusers`);
    const data = await resusers.data;
    setUsers(data);
  };
  const profileClick = async (email) => {
    const resusers = await axios.get(
      `http://localhost:3000/api/getuser?email=${email}`
    );
    const data = await resusers.data;
    setGetuser(data[0]);
    setShowuser(true);
  };
  return (
    <div>
      {!showuser && (
        <div>
          {users.map((items) => {
            return (
              <div
                className="flex items-center border shadow-sm"
                key={items._id}
              >
                <img
                  src={`${
                    typeof items.image !== "undefined"
                      ? items.image
                      : "./profile.svg"
                  }`}
                  className="h-14 w-14 my-4 mx-2 "
                  alt={items.fullname}
                  onClick={() => profileClick(items.email)}
                />
                <p className="my-4 mx-2 text-3xl cursor-pointer" onClick={() => props.message(items.email)}>{items.fullname}</p>
              </div>
            );
          })}
        </div>
      )}
      {showuser && (
        <div className="ease-in">
          <div className="flex flex-col">
            <FaArrowLeft
              onClick={() => setShowuser(false)}
              className="mt-14 mx-2 text-3xl cursor-pointer"
            />
            <div className="flex flex-col justify-center items-center">
              <div>
                <span className="bg-gray-200 justify-center">
                  <img
                    src={`${
                      typeof getuser.image !== "undefined"
                        ? getuser.image
                        : "./profile.svg"
                    }`}
                    className="h-20 w-20"
                    alt={getuser.fullname}
                  />
                </span>
              </div>
              <p className=" my-2 text-3xl font-bold">{getuser.fullname}</p>
              <p className=" my-2 text-md font-sm">{typeof getuser.bio !=  "undefined" ? getuser.bio : 'Available on .Metalk'}</p>
                <span>
              <p className=" my-3 text-lg font-md bg-gray-300 p-4 rounded-lg">Phonenumber : {getuser.phonenumber}</p>
                </span>
                <span>
              <p className=" my-3 text-lg font-md bg-gray-300 p-4 rounded-lg">Email : {getuser.email}</p>
                </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
