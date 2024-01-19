import Landing from "@/components/landing";
import React, { useEffect, useState } from "react";
import axios from "axios";
function Editme() {
  const [profile, setProfile] = useState({});
  const [bio, setBio] = useState("");
  const [penultmimg, setPenultmimg] = useState("");
  const [image, setImage] = useState("");
  const [imgedit, setImgedit] = useState(false);
  const [sessionStatus, setSessionStatus] = useState(false);
  const [forconfrm, setForconfrm] = useState(false);
  const [isbioedit, setIsbioedit] = useState(false);
  useEffect(() => {
    const status = localStorage.getItem("loggedIn");
    setSessionStatus(status);
    if (status) {
      const data = JSON.parse(localStorage.getItem("data"));
      setProfile(data);
      setBio(data.bio);
      setImage(data.image);
    }
  }, []);
  const handleEdit = async() => {
    const fullname = profile.fullname;
    const email = profile.email;
    const phonenumber = profile.phonenumber
    if (forconfrm) {
        setImage(penultmimg)
    }
    const data = { fullname, email, bio,phonenumber, image };
    localStorage.setItem("data" , JSON.stringify(data))
    axios.put('http://localhost:3000/api/adduserimageorbio' , {
        data
    })
  };
  return (
    <div>
      {sessionStatus && (
        <div>
          <div>
            <div className="p-4 flex items-center flex-col">
              <span className="flex flex-col">
                <img
                  src={`${
                    typeof image !== "undefined" ? image : "./profile.svg"
                  }`}
                  className="h-24 w-24 rounded-full"
                  alt="profilepic"
                  onMouseEnter={() => setImgedit(true)}
                />
                {imgedit && (
                  <div>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      className="visible"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        setPenultmimg(URL.createObjectURL(e.target.files[0]));
                        setForconfrm(true);
                      }}
                    />
                  </div>
                )}
              </span>
              {forconfrm && (
                <div>
                  <img src={penultmimg} alt="" className="my-5" />
                </div>
              )}
              <p className=" my-2 text-3xl font-bold">{profile.fullname}</p>
              <p className=" my-2 text-md font-sm">
                <input
                  type="text"
                  value={
                    typeof bio != "undefined" ? bio : "Available on .Metalk"
                  }
                  className="bg-gray-200 p-2 text-center"
                  onChange={(e) => {
                    setBio(e.target.value);
                    setIsbioedit(true);
                  }}
                />
              </p>
              <span>
                <p className=" my-3 text-lg font-md bg-gray-300 p-4 rounded-lg">
                  Phonenumber : {profile.phonenumber}
                </p>
              </span>
              <span>
                <p className=" my-3 text-lg font-md bg-gray-300 p-4 rounded-lg">
                  Email : {profile.email}
                </p>
              </span>
              {isbioedit || forconfrm ? (
                <button onClick={handleEdit} className="text-3xl p-3 my-1 bg-blue-400 rounded">EditMe</button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
      {!sessionStatus && (
        <div>
          <Landing />
        </div>
      )}
    </div>
  );
}

export default Editme;
