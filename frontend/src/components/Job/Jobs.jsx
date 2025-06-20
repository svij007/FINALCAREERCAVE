import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

useEffect(() => {
  const storedJwt = localStorage.getItem('token');
  
  try {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/job/getall`, {
        withCredentials: true,
           headers: {
              'Authorization': storedJwt,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
      })
      .then((res) => {
        setJobs(res.data);
      });
  } catch (error) {
    console.log(error);
  }
}, []);


  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  {/* Update the Link path to match the App.jsx route */}
                  <Link to={`/jobs/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
