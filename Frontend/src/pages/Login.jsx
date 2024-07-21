import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        formdata
      );
      alert(res.data.message);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.name);
        nav("/home");
      } else {
        console.log("No token here");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else if (error.request) {
        alert("No response received from the server");
      } else {
        alert("Error: " + error.message);
      }
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <div className="register-container">
        <h1>Login Page</h1>
        <form onSubmit={handlelogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formdata.email}
              onChange={(e) =>
                setformdata({ ...formdata, [e.target.name]: e.target.value })
              }
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formdata.password}
              onChange={(e) =>
                setformdata({ ...formdata, [e.target.name]: e.target.value })
              }
              required
              autoComplete="off"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
