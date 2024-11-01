import { jwtDecode } from "jwt-decode";
import api from "../../api/api";

const TOKEN_KEY = "token";

export const authService = {
  // Get token from local storage
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Decode the token
  decodeToken() {
    const token = authService.getToken();
    if (token) return jwtDecode(token);
    return null;
  },

  // Save token to local storage
  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Remove token from local storage
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Check if token is valid
  isTokenValid() {
    const token = authService.getToken();
    if (!token) return false;

    const { exp } = jwtDecode(token);
    return Date.now() / 1000 < exp; // Return true if not expired
  },

  // Login function
  async login(credentials) {
    try {
      const response = await api.post("/auth/login", credentials);
      const { token } = response.data;
      authService.saveToken(token); // Save the token
      const decoded = authService.decodeToken(); // Decode the token
      return decoded.role; // Return the user role
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  // Logout function
  async logout() {
    try {
      await api.post("/auth/logout");
      authService.removeToken(); // Use authService instead of this
      window.location.reload(); // Reload the page to reset auth state
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  },

  // Fetch user info with the token
  async fetchUserInfo() {
    const token = authService.getToken();
    if (!token || !authService.isTokenValid()) {
      await authService.logout(); // Log out if token is missing or expired
      throw new Error("User is not authenticated");
    }

    try {
      const response = await api.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  },
};
