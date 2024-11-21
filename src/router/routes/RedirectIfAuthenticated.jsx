import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../../services/auth/auth";

export default function RedirectIfAuthenticated({ children }) {
  const token = authService.getToken();

  if (!token) {
    // If there's no token, allow access to the login page
    return children;
  }

  try {
    const decodedToken = authService.decodeToken(token);
    console.log(decodedToken);
    // Redirect to the dashboard if the user is an admin
    if (decodedToken.role === "admin") {
      return <Navigate to={`/admin/dashboard/${decodedToken?.id}`} />;
    }
    if (decodedToken.role === "seller") {
      return <Navigate to="/seller/dashboard" />;
    }
    if (decodedToken.role === "user") {
      return <Navigate to="/account-center/profile" />;
    }
  } catch (error) {
    console.error("Invalid token", error);
  }

  return children; // Render the login component if not authenticated
}
