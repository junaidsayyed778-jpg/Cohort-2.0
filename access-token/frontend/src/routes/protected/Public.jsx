import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Public = () => {
  let { user } = useSelector((store) => store.auth);

  if (user) return <Navigate to={"/home"} />;
  return <Outlet />;
};

export default Public;
