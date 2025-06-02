import React from "react";
import { FaSwimmingPool, FaCode, FaBook } from "react-icons/fa";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Fins Swimming Facility",
      location: "Cypress, Texas",
      openPositions: 10,
      icon: <FaSwimmingPool />,
    },
    {
      id: 2,
      title: "Code Ninjas",
      location: "Cypress, Texas",
      openPositions: 5,
      icon: <FaCode />,
    },
    {
      id: 3,
      title: "Kumon",
      location: "Cypress, Texas",
      openPositions: 20,
      icon: <FaBook />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
