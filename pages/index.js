import Landing from "@/components/landing";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const router = useRouter();
  const [sessionStatus, setSessionStatus] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userInfo, setUserInfo] = useState([])
  useEffect(() => {
    const status = localStorage.getItem("loggedIn");
    setSessionStatus(status)
    const user = JSON.parse(localStorage.getItem("data"))
    console.log(user)
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    setSessionStatus(false)
  };

  return (
    <div>
      {sessionStatus && (
        <div>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
       {!sessionStatus && (
        <div>
          <Landing/>
        </div>
      )}
    </div>
  );
}
