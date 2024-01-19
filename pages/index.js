import Users from "@/components/Users";
import Landing from "@/components/landing";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
export default function Home() {
  const [sessionStatus, setSessionStatus] = useState(false);
  const [message, setMessage] = useState(false);
  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [allmessage, setAllmessage] = useState([]);
  const [recieveremail, setRecieveremail] = useState("");
  const [textmessage, setTextmessage] = useState("");
  const [toggleme, setToggleme] = useState(false);
  const [profilebio, setProfilebio] = useState('')
  const [toggleimage, setToggleimage] = useState(false)
  const [profileimg, setProfileimg] = useState('')

  useEffect(() => {
    const status = localStorage.getItem("loggedIn");
    setSessionStatus(status);
    const user = JSON.parse(localStorage.getItem("data"));
    if (status) {
      setProfile(user);
    setProfilebio(user.bio)
    }
  }, []);
  const handleTextmsg = (e) => {
    e.preventDefault();
    const data = {
      senderemail: profile.email,
      recieveremail: recieveremail,
      text: textmessage,
    };
    axios
      .post("http://localhost:3000/api/messages", {
        data,
      })
      .then(function (response) {
        setTextmessage("");
      })
      .catch(function (error) {});
  };
  const handleMessage = async (email, name, image) => {
    // Combine API calls for received and sent messages
    setRecieveremail(email);
    const [receivedData, sentData] = await Promise.all([
      axios.get(
        `http://localhost:3000/api/getmessages?sender=${email}&reciever=${profile.email}`
      ),
      axios.get(
        `http://localhost:3000/api/getmessages?sender=${profile.email}&reciever=${email}`
      ),
    ]);
    const receivedMessages = receivedData.data.map((item) => ({
      ...item,
      type: "received",
    }));
    const sentMessages = sentData.data.map((item) => ({
      ...item,
      type: "sent",
    }));
    setMessage(true);
    setUsername(name);
    setImage(image);
    const allMessages = receivedMessages.concat(sentMessages);
    const sortedMessages = allMessages
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setAllmessage(sortedMessages);
  };
  const handleLogout = () => {
    localStorage.clear();
    setSessionStatus(false);
  };
 console.log(profilebio)
  return (
    <div>
      {sessionStatus && (
        <div className="flex">
          <div className="w-[30%] h-[90vh] bg-gray-100 my-10 ml-10 shadow-md">
            <nav className="flex flex-row justify-between bg-gray-600">
              <ul className="my-2 mx-2 flex items-center">
                <li>
                  <img
                    src={`${
                      typeof profile.image !== "undefined"
                        ? profile.image
                        : "./profile.svg"
                    }`}
                    className="h-14 w-14 rounded"
                    alt="profilepic"
                    onClick={(event) => setToggleme(true)}
                  />
                </li>
              </ul>
              <ul className="my-2 mx-2">
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-400 rounded-md p-3 text-xl shadow-sm"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </nav>
            {toggleme && (
              <div className="ease-in">
                <div className="flex flex-col">
                  <FaArrowLeft
                    onClick={(event) => setToggleme(false)}
                    className="mt-14 mx-2 text-3xl cursor-pointer"
                  />
                  <div className="flex flex-col justify-center items-center">
                    <div>
                      <span className="bg-gray-200 justify-center">
                        <img
                          src={`${
                            typeof profile.image !== "undefined"
                              ? profile.image
                              : "./profile.svg"
                          }`}
                          className="h-20 w-20"
                          alt={profile.fullname}
                          onClick={(event) => setToggleimage(true)}
                        />
                      
                      </span>
                      {toggleimage && (
                          <div>
                            <h1>See image</h1>3
                          </div>
                        )}
                    </div>
                    <p className=" my-2 text-3xl font-bold">
                      {profile.fullname}
                    </p>
                    <p className=" my-2 text-md font-sm">
                      <input type="text" value={ typeof profilebio != "undefined"
                        ? profilebio
                        : "Available on .Metalk"} 
                        className="text-center bg-gray-100"
                        onChange={(e) => setProfilebio(e.target.value)}
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
                  </div>
                </div>
              </div>
            )}
            {!toggleme && <Users message={handleMessage} />}
          </div>
          <div className="w-[60%] h-[90vh] bg-gray-300 my-10">
            {!message && (
              <div
                className="bg-slate-600 h-[90vh] w-full items-center flex justify-center border-l-2"
                alt="message"
              >
                <p className=" text-gray-300 text-5xl text-center">
                  Hello! Start Messaging
                </p>
              </div>
            )}
            {message && (
              <div className="bg-slate-600 h-[90vh] w-full items-center flex justify-center border-l-2 ">
                <div className="bg-white shadow-md  w-full h-[90vh]">
                  <div className="p-3 border-b bg-blue-500 text-white flex items-center">
                    <img
                      src={`${
                        typeof image !== "undefined" ? image : "./profile.svg"
                      }`}
                      className="h-14 w-14 rounded"
                      alt={username}
                    />
                    <p className="text-xl p-3">{username}</p>
                  </div>
                  <div>
                    <div id="chatbox" className="p-4 h-[73vh] overflow-y-auto">
                      {allmessage.map((items) => {
                        return (
                          <div key={items._id}>
                            {items.type === "sent" && (
                              <div className="mb-2 text-right">
                                <div className="flex flex-row-reverse justify-start items-center">
                                  <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                                    {items.text}
                                  </p>
                                  <p className="mx-2">
                                    {items.date.slice(11, 16)}
                                  </p>
                                </div>
                              </div>
                            )}
                            {items.type === "received" && (
                              <div className="mb-2">
                                <div className="flex items-center">
                                  <p className="bg-yellow-500 text-white rounded-lg py-2 px-4 inline-block">
                                    {items.text}
                                  </p>
                                  <p className="mx-2">
                                    {items.date.slice(11, 16)}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 border-t flex">
                    <input
                      id="user-input"
                      type="text"
                      placeholder="Type a message"
                      value={textmessage}
                      className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setTextmessage(e.target.value)}
                    />
                    <button
                      id="send-button"
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                      onClick={handleTextmsg}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
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
