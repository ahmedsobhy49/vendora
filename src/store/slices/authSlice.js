import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchUserInfo } from "../../services/fetchUserInfo"; // Adjust the import path

const initialState = {
  userId: "",
  user: null, // Store user info
  loading: false,
  error: null,
};

// Create an async thunk for fetching user info
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    const userInfo = await fetchUserInfo();
    return userInfo; // Return the user info to be used in the fulfilled action
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.userId = action.payload;
    },
    logout(state) {
      state.userId = null;
      state.user = null; // Clear user info on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Set user info
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store error message
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
