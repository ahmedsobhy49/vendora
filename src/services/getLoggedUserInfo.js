import api from "../api/api";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode to decode the token

// Function to get user information
async function fetchUserInfo() {
  try {
    // Get the token directly from local storage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }

    // Decode the token to get user info
    const decodedToken = jwtDecode(token);
    const { id: userId, exp, role } = decodedToken; // Destructure userId, exp, and role
    console.log(exp);
    // Check if the token is expired
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (exp < currentTime) {
      throw new Error("Token has expired. Please log in again.");
    }
    // Call the API endpoint to get user info
    const response = await api.get(`/auth/user/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log(response.data);
    return response.data; // Return the user info from the response
  } catch (error) {
    console.error("Error fetching user info:", error);

    // You could throw a more specific error message if needed
    if (error.response) {
      // If the error is from the API, you can access the response
      throw new Error(`API Error: ${error.response.data.message}`);
    }

    throw error; // Rethrow the error for further handling
  }
}

export default fetchUserInfo;
