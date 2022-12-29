import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
};

export const userLogin = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    isLogin: (state, { payload }) => {
      state.login = payload;
    },
  },
});

export const { isLogin } = userLogin.actions;

export default userLogin.reducer;
