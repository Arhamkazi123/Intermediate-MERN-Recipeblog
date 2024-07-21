import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchrecipes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/auth/getallrecipes",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setdata(res.data.message);
      } catch (error) {
        alert(error.res.data.message);
      }
    };
    fetchrecipes();
  }, []);

  const handleSave = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/postsavedrecipes",
        { recipeid: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
    } catch (error) {
      alert(error.res.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mainbody">
        {data.map((item) => (
          <div className="card" key={item._id}>
            <h2 className="card__title">{item.title}</h2>
            <p className="card__ingredients">
              <strong>Ingredients:</strong> {item.ingredients}
            </p>
            <p className="card__timetaken">
              <strong>Time Taken:</strong> {item.timetaken}
            </p>
            <p className="card__description">{item.description}</p>
            <button
              style={{ backgroundColor: "blue", color: "white" }}
              onClick={() => handleSave(item._id)}
            >
              Save Post
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
