// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  logged: null,
  user: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload: { user } }) => {
      state.logged = true;
      state.user = user;
    },
    logout: (state) => {
      state.logged = false;
      state.user = null;
    },
    updateUser: (state, { payload: { user } }) => {
      state.user = {
        ...state.user,
        ...user,
      };
    },
  },
});

export default auth.reducer;

export const { login, logout, updateUser } = auth.actions;
