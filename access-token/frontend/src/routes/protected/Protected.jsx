import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  let { user, isLoading } = useSelector((store) => store.auth);

if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
    </div>
  );
}
  if (!user) return <Navigate to={"/"} />;
  return <Outlet />;
};

export default Protected;
