import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import

export default function RedirectIfAuthenticated({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (!user) {
    // If there's no token, allow access to the login page
    return children;
  }

  try {
    const decodedToken = jwtDecode(token);

    // Redirect to the dashboard if the user is an admin
    if (decodedToken.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    if (decodedToken.role === "seller") {
      return <Navigate to="/seller/dashboard" />;
    }
  } catch (error) {
    console.error("Invalid token", error);
  }

  return children; // Render the login component if not authenticated
}
