// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = [];

const snackbar = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    addSnackbar: (state, { payload: snackbar }) => {
      state.push(snackbar);
    },
    deleteSnackbar: (state, { payload: id }) => {
      const index = state.findIndex((e) => e.id === id);
      state.splice(index, 1);
    },
  },
});

export default snackbar.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer } =
  snackbar.actions;
