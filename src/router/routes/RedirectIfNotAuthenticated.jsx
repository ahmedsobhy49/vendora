import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../../services/auth/auth";
export function RedirectIfNotAuthenticated({ children, allowedRoles }) {
  const token = authService.getToken(); // Get the token using authService

  // Check if the token exists
  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  try {
    const decodedToken = authService.decodeToken(); // Decode the token

    // Check if the user has an allowed role
    if (!allowedRoles.includes(decodedToken.role)) {
      return <Navigate to="/unauthorized" />; // Redirect if role is not allowed
    }

    return children; // Render the children if the role is allowed
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/login" />; // Redirect to login if token is invalid
  }
}

export default RedirectIfNotAuthenticated;
