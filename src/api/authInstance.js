import axios from "axios";

const authInstance = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  headers: {
    Accept: "application/json",
  },
});

export default authInstance;
