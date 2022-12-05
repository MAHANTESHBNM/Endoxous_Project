import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AdminPrivateRoute = (Admin) => {
  const navigate = useNavigate();
  let isValidToken;
  const { isAdmin } = Admin;

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const token = JSON.parse(localStorage.getItem("token"));
  if(!token){
   return navigate('/')
  }



let decodedToken = jwt_decode(token);
let currentDate = new Date();

// // JWT exp is in seconds
if (decodedToken.exp * 1000 < currentDate.getTime()) {
  localStorage.removeItem("token");
  isValidToken=false
  navigate('/');

 
} else {
  isValidToken=true
  
}

  if (isValidToken===false||isAuthenticated === false ) {
    return <Navigate to="/" replace />;
  }
  if (isAuthenticated ===true&& isAdmin === true && user.role === "admin"&&isValidToken===true) {
    return <Outlet />;
  }
};

export default AdminPrivateRoute;
