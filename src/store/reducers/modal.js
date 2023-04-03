// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  open: false,
  title: "",
  body: null,
  previousStates: [],
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, { payload: { title, body } }) => {
      state.open = true;
      state.title = title;
      state.body = body;
    },
    hideModal: (state) => {
      state.open = false;
      state.previousStates = [];
    },
    nextModalPage: (state, { payload: { body, title } }) => {
      state.previousStates.unshift({ body: state.body, title: state.title });
      state.body = body;
      state.title = title;
    },
    previousModalPage: (state) => {
      const nextState = state.previousStates[0];
      if (!nextState) return;
      state.previousStates.splice(1);
      state.body = nextState.body;
      state.title = nextState.title;
    },
  },
});

export default modal.reducer;

export const { hideModal, nextModalPage, previousModalPage, showModal } =
  modal.actions;
