import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams(); 
  const [job, setJob] = useState(null);
  const { isAuthorized, user } = useContext(Context); 
  const navigateTo = useNavigate();

useEffect(() => {
   const storedJwt = localStorage.getItem('token');
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/job/${id}`, { withCredentials: true ,headers: {
            'Authorization': storedJwt,
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json'
          }})
    .then((res) => setJob(res.data.job))
    .catch(() => navigateTo("/notfound"));
}, [id, navigateTo]);


useEffect(() => {
  if (!isAuthorized) {
    navigateTo("/login");
  }
}, [isAuthorized, navigateTo]);

if (!isAuthorized) {
  return null;
}

  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Salary$:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {/* Add description here */}
          <p>
            Description: <span>{job.description}</span>
          </p>
          {user?.role === "Job Seeker" && (
            <Link className="apply-button" to={`/application/${job._id}`}>
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
  
};

export default JobDetails;
