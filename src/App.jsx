import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentJoin from "./pages/StudentJoin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Test from "./pages/Test";
import NoPage from "./pages/NoPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function App() {
  function RedirectToHome() {
    const navigate = useNavigate();
    useEffect(() => {
      console.log("hello");
      navigate("/home");
    }, []);
    return <></>;
  }

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<RedirectToHome />} />
          <Route path="/studentJoin/:branchId/:courseId/:courseString" exact element={<StudentJoin toast={toast} />} />
          <Route path="/home/*" exact element={<Home toast={toast} />} />
          <Route path="/login" exact element={<Login toast={toast} />} />
          <Route path="/test" exact element={<Test />} />
          <Route path="*" exact element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
