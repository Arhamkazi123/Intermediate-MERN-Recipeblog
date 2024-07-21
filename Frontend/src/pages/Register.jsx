import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/register",
        formdata
      );
      alert(res.data.message);
      nav("/login");
    } catch (error) {
      alert(error.res.data.message);
    }
  };
  return (
    <>
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formdata.username}
              onChange={(e) =>
                setformdata({ ...formdata, [e.target.name]: e.target.value })
              }
              required
              autoComplete="off"
            />
          </div>
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
          <button type="submit">Register</button>
        </form>

        <Link to="/login">Already have an account?Click Here</Link>
      </div>
    </>
  );
};

export default Register;
