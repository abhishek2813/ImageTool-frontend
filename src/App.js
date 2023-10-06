import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import UserImages from "./components/pages/UserImages";
import SignUp from "./components/pages/SignUp";
import { useEffect, useState } from "react";
import UploadImages from "./components/pages/UploadImages";

function App() {
  const [isLogin, setIsLogin] = useState({});

  //chcek if user is there
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      setIsLogin(auth);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/images" element={<UserImages />} />
          <Route path="/upload-images" element={<UploadImages />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
