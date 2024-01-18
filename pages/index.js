import Users from "@/components/Users";
import Landing from "@/components/landing";
import axios, { all } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const router = useRouter();
  const [sessionStatus, setSessionStatus] = useState(false);
  const [message, setMessage] = useState(false);
  const [profile, setProfile] = useState({});
  const [modal, setModal] = useState(false);
  const [sentmessage, setSentmessage] = useState([]);
  const [recievedmessage, setRecievedmessage] = useState([]);
  useEffect(() => {
    const status = localStorage.getItem("loggedIn");
    setSessionStatus(status);
    const user = JSON.parse(localStorage.getItem("data"));
    if (status) {
      setProfile(user);
    }
    if (message) {
      handleMessage();
    }
  }, []);

  const handleMessage = async (email) => {
    handleRecieveMessage(email);
    handleSentMessage(email);
    setMessage(true);
  };
  const handleRecieveMessage = async (email) => {
    const resusers = await axios.get(
      `http://localhost:3000/api/getmessages?sender=${email}&reciever=${profile.email}`
    );
    const data = await resusers.data;
    const alldata = await data.map((item) => ({ ...item, type: "recieved" }));
    setRecievedmessage(await alldata);
  };
  const handleSentMessage = async (email) => {
    const resusers = await axios.get(
      `http://localhost:3000/api/getmessages?sender=${profile.email}&reciever=${email}`
    );
    const data = await resusers.data;
    const alldata = await data.map((item) => ({ ...item, type: "sent" }));
    setSentmessage(await alldata);
  };
  const handleLogout = () => {
    localStorage.clear();
    setSessionStatus(false);
  };
  return (
    <div>
      {sessionStatus && (
        <div className="flex">
          <div className="w-[30%] h-[90vh] bg-gray-100 my-10 ml-10 shadow-md">
            <nav className="flex flex-row justify-between bg-gray-600">
              <ul className="my-2 mx-2">
                <li>
                  <img
                    src={`${
                      typeof profile.image !== "undefined"
                        ? profile.image
                        : "./profile.svg"
                    }`}
                    className="h-14 w-14 rounded"
                    alt="profilepic"
                    onMouseOver={() =>
                      setTimeout(() => {
                        setModal(true);
                      }, "700")
                    }
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setModal(false);
                      }, "200")
                    }
                    onClick={(event) => router.push("/user")}
                  />
                </li>
                {modal && (
                  <div className="bg-gray-200 shadow-md p-4 absolute">
                    <p>{profile.fullname}</p>
                  </div>
                )}
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
            <Users message={handleMessage} />
          </div>
          <div className="w-[60%] h-[90vh] bg-gray-300 my-10">
            {!message && (
              <div
                class="bg-slate-600 h-[90vh] w-full items-center flex justify-center border-l-2"
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
                  <div className="p-4 border-b bg-blue-500 text-white flex justify-between items-center">
                    <p className="text-lg font-semibold">Admin Bot</p>
                  </div>
                  <div id="chatbox" className="p-4 h-[73vh] overflow-y-auto">
                    <div className="mb-2 text-right">
                      <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                        hello
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                        This is a response from the chatbot.
                      </p>
                    </div>
                    <div className="mb-2 text-right">
                      <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                        hello
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                        This is a response from the chatbot.
                      </p>
                    </div>
                    <div className="mb-2 text-right">
                      <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                        hello
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                        This is a response from the chatbot.
                      </p>
                    </div>
                    <div className="mb-2 text-right">
                      <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                        hello
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                        This is a response from the chatbot.
                      </p>
                    </div>
                    <div className="mb-2 text-right">
                      <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                        hello
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                        This is a response from the chatbot.
                      </p>
                    </div>
                    <div className="mb-2 text-right">
                      <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                        hello
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                        This is a response from the chatbot.
                      </p>
                    </div>
                    <div className="mb-2 text-right">
                      <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                        this example of chat
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                        This is a response from the chatbot.
                      </p>
                    </div>
                    <div className="mb-2 text-right">
                      <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                        design with tailwind
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                        This is a response from the chatbot.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 border-t flex">
                    <input
                      id="user-input"
                      type="text"
                      placeholder="Type a message"
                      className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      id="send-button"
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                    >
                      Send
                    </button>
                  </div>
                </div>

                {/* <div>
                {sentmessage.map((items) => {
                  return (
                    <div>
                      <p className="bg-blue-700 text-xl p-4 rounded-lg">
                        {items.text}
                      </p>
                      <br />
                    </div>
                  );
                })}
                <br />
                {recievedmessage.map((items) => {
                  return (
                    <div>
                      <p className="bg-yellow-700 text-xl p-4 rounded-md">
                        {items.text}
                      </p>
                      <br />
                    </div>
                  );
                })}
                </div> */}
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
