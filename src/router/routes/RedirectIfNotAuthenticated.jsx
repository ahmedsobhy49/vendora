import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected impo

export function RedirectIfNotAuthenticated({ children }) {
  const user = JSON.parse(localStorage.getItem("user")); // Get the token directly
  const token = user.token;
  // Check if the token exists
  if (!user) {
    return <Navigate to="/admin/login" />; // Redirect to login if no token
  }
  try {
    const decodedToken = jwtDecode(token); // Decode the token

    // Example: Check if the user has the admin role
    if (decodedToken.role !== "admin") {
      return <Navigate to="/unauthorized" />; // Redirect if not admin
    }

    return children; // Render the children if admin
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/admin/login" />; // Redirect to login if token is invalid
  }
}

export default RedirectIfNotAuthenticated;
