import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function RequireAuth({ children }) {
  const { auth } = useSelector((state) => state);
  let location = useLocation();

  if (!auth.authenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;