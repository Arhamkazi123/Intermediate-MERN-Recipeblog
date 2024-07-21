import React from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    nav("/");
  };

  const gotohome = () => {
    nav("/home");
  };
  return (
    <nav className="navbar">
      <div className="navbar__title" onClick={gotohome}>
        RecipewithCoders
      </div>
      <ul className="navbar__links">
        <li className="navbar__item">
          <Link to="/savedposts" className="navbar__link">
            Saved Recipes
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/addrecipe" className="navbar__link">
            Post A Recipe
          </Link>
          <button
            onClick={handlelogout}
            logout-button
            style={{
              backgroundColor: "maroon",
              color: "white",
              fontSize: "15px",
              padding: "10px",
              borderRadius: "10px",
              marginLeft: "10px",
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
