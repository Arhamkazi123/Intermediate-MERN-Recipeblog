import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addarecipe = () => {
  const nav = useNavigate();
  const [fd, setFd] = useState({
    title: "",
    ingredients: "",
    timetaken: "",
    description: "",
  });

  const handleRecipe = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/postrecipe",
        fd,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      nav("/home");
    } catch (error) {
      alert(error.res.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <h1>Add a Recipe</h1>
        <form onSubmit={handleRecipe}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              autoComplete="off"
              value={fd.title}
              onChange={(e) =>
                setFd({ ...fd, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              required
              autoComplete="off"
              value={fd.ingredients}
              onChange={(e) =>
                setFd({ ...fd, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="timetaken">Time Taken</label>
            <input
              type="text"
              id="timetaken"
              name="timetaken"
              required
              autoComplete="off"
              value={fd.timetaken}
              onChange={(e) =>
                setFd({ ...fd, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              required
              autoComplete="off"
              value={fd.description}
              onChange={(e) =>
                setFd({ ...fd, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </>
  );
};

export default Addarecipe;
