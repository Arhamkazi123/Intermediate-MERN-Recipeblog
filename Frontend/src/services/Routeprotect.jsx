import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const Routeprotect = () => {
  const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default Routeprotect;
