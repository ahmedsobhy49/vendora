import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSucess: (state, action) => {
      state.token = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { loginSucess } = authSlice.actions;
