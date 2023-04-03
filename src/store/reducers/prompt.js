// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  open: false,
  title: null,
  text: null,
  accept: "",
  decline: "",
  acceptCb: () => undefined,
  declineCb: () => undefined,
};

const prompt = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    resetPrompt: () => initialState,
    hidePrompt: (state) => {
      state.open = false;
    },
    showPrompt: (
      state,
      { payload: { text: tt, title, accept, decline, acceptCb, declineCb } }
    ) => {
      state.title = title;
      state.text = tt;
      state.accept = accept;
      state.decline = decline;
      state.acceptCb = acceptCb;
      state.declineCb = declineCb;
      state.open = true;
    },
  },
});

export default prompt.reducer;

export const { hidePrompt, resetPrompt, showPrompt } = prompt.actions;
