import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getuser`,
          {
            withCredentials: true,
          }
        );
        console.log("User fetched:", response.data.user);
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.log("Error fetching user:", error);
        setIsAuthorized(false);
      }
    };

    if (!isAuthorized) {
      fetchUser();
    }
  }, [isAuthorized, setUser, setIsAuthorized]);

  if (!isAuthorized) {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Jobs route available to all authenticated users */}
        <Route path="/jobs" element={<Jobs />} />

        {/* Applications */}
        <Route
          path="/applications/me"
          element={
            user?.role === "Job Seeker" || user?.role === "Employer"
              ? <MyApplications />
              : <NotFound />
          }
        />

        {/* Job Details and Application (for Job Seekers only) */}
        <Route path="/job/:id" element={user?.role === "Job Seeker" ? <JobDetails /> : <NotFound />} />
        <Route path="/application/:id" element={user?.role === "Job Seeker" ? <Application /> : <NotFound />} />

        {/* Employers */}
        <Route path="/job/post" element={user?.role === "Employer" ? <PostJob /> : <NotFound />} />
        <Route path="/job/me" element={user?.role === "Employer" ? <MyJobs /> : <NotFound />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
