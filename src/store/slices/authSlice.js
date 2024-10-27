import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  role:"",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSucess: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.user.role;
    },
  },
});

export default authSlice.reducer;
export const { loginSucess } = authSlice.actions;
