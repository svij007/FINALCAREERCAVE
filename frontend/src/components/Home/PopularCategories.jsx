import React from "react";
import { 
  MdOutlineComputer, // Coding & Web Development
  MdOutlineSchool, // Education
  MdRestaurant, // Local Restaurants
  MdStorefront, // Local Retail Stores
  MdLocalShipping, // Delivery Companies
  MdOutlineSpa, // Salons
  MdVideocam, // Social Media Videographer
  MdLocalHospital // Hospital & Veterinary Assistance
} from "react-icons/md";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Coding & Web Development",
      subTitle: "5 Open Positions",
      icon: <MdOutlineComputer />,
    },
    {
      id: 2,
      title: "Education",
      subTitle: "15 Open Positions",
      icon: <MdOutlineSchool />,
    },
    {
      id: 3,
      title: "Local Restaurants",
      subTitle: "15 Open Positions",
      icon: <MdRestaurant />,
    },
    {
      id: 4,
      title: "Local Retail Stores",
      subTitle: "20 Open Positions",
      icon: <MdStorefront />,
    },
    {
      id: 5,
      title: "Delivery Companies",
      subTitle: "5 Open Positions",
      icon: <MdLocalShipping />,
    },
    {
      id: 6,
      title: "Salons",
      subTitle: "10 Open Positions",
      icon: <MdOutlineSpa />,
    },
    {
      id: 7,
      title: "Social Media Videographer",
      subTitle: "5 Open Positions",
      icon: <MdVideocam />,
    },
    {
      id: 8,
      title: "Hospital & Veterinary Assistance",
      subTitle: "10 Open Positions",
      icon: <MdLocalHospital />,
    },
  ];

  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
