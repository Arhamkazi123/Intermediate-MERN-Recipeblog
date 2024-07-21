import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Savedposts = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchallsavedposts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/auth/getsavedrecipes",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setdata(res.data);
      } catch (error) {
        console.error("Error fetching saved data:", error);
      }
    };
    fetchallsavedposts();
  }, []);

  const handledelete = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:8000/api/auth/deletedsavedrecipes",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          data: { objectid: id },
        }
      );
      alert("Post is unsaved");
      setdata(data.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Delete failed");
    }
  };

  return (
    <>
      <Navbar />
      <h1>Here are all your saved recipes</h1>
      <div>
        {data.length > 0 ? (
          data.map((post) => (
            <div key={post._id}>
              <h2>{post.recipe.title}</h2>
              <p>Ingredients: {post.recipe.ingredients}</p>
              <p>Time taken: {post.recipe.timetaken}</p>
              <p>Description: {post.recipe.description}</p>
              <p>Author: {post.author.username}</p>
              <button onClick={() => handledelete(post._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No saved recipes found.</p>
        )}
      </div>
    </>
  );
};

export default Savedposts;
