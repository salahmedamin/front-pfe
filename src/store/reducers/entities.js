// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  user: {
    page: 0,
    data: [],
  },
  categorie: {
    page: 0,
    data: [],
  },
  marque: {
    page: 0,
    data: [],
  },
  produit: {
    page: 0,
    data: [],
  },
  equipe: {
    page: 0,
    data: [],
  },
  tache: {
    page: 0,
    data: [],
  },
  facture: {
    page: 0,
    data: [],
  },
  fournisseur: {
    page: 0,
    data: [],
  },
};

const entities = createSlice({
  name: "entities",
  initialState,
  reducers: {
    addEntity: (state, { payload: { data, entity } }) => {
      if (!(entity in state)) return;
      if (Array.isArray(data))
        state[entity].data = [...state[entity].data, ...data];
      else state[entity].data.push(data);
    },
    deleteEntity: (state, { payload: { entity, id } }) => {
      if (!(entity in state)) return;
      state[entity].data = state[entity].data.filter(e=>e.id !== id)
    },
    updateEntity: (state, { payload: { entity, id, data } }) => {
      if (!(entity in state)) return;
      const index = state[entity].data.findIndex((e) => e.id === id);
      if (index === -1) return;
      state[entity].data[index] = {
        ...state[entity].data[index],
        ...data
      };
    },
    paginateEntity: (
      state,
      {
        payload: {
          entity,
          increment = false,
          decrement = false,
          set = undefined,
        },
      }
    ) => {
      if (!(entity in state)) return;
      if (!(increment || decrement || !isNaN(set))) return;
      if (increment) state[entity].page += 1;
      else if (decrement) state[entity].page -= 1;
      else state[entity].page = set;
    },
    resetEntity: (state, { payload: { entity } }) => {
      if (!(entity in state)) return;
      state[entity].page = 0;
      state[entity].data = [];
    },
    resetAllEntities: () => {
      return initialState;
    },
  },
});

export default entities.reducer;

export const {
  addEntity,
  deleteEntity,
  updateEntity,
  paginateEntity,
  resetEntity,
  resetAllEntities,
} = entities.actions;
