import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userInformationFake from "../constants/userInformationFake";
import DashHome from "../components/DashHome";
import UserHome from "../components/UserHome";
import "react-toastify/dist/ReactToastify.css";
import jsonParse from "../functions/jsonParse";

function Home(props) {
  const [userInformation, setUserInformation] = useState(userInformationFake);
  const [hub, setHub] = useState(null);
  const navigate = useNavigate();

  async function getInformation() {
    const result = jsonParse(localStorage.getItem("user"));
    // if token doesn't exist
    if (!result?.token) navigate("/login");
    // if token exists
    else {
      // const response = await fetch(`${import.meta.env.VITE_URL}/auth/isActive`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
      // const data = await response.json();
      const data = { success: true };
      // if token exists and active
      if (data.success) {
        setUserInformation({ ...result });
        if (result.role == "مدير") setHub("dash");
        else setHub("ins");
      }
      // if token exists but doesn't active
      else {
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    getInformation();
  }, []);

  return <>{hub == "dash" ? <DashHome userInformation={userInformation} toast={props.toast} /> : hub == "ins" ? <UserHome userInformation={userInformation} toast={props.toast} /> : null}</>;
}

export default Home;
