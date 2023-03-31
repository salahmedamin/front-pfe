// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  user: null,
  produit: null,
  equipe: null,
  marque: null,
  categorie: null,
  facture: null,
  fournisseur: null,
  tache: null,
};

const totals = createSlice({
  name: "totals",
  initialState,
  reducers: {
    setTotals: (state, { payload: { totals } }) => {
      return {
        ...state,
        ...totals,
      };
    },
    emptyTotals: (state) => initialState,
  },
});

export default totals.reducer;

export const { setTotals, emptyTotals } = totals.actions;
