import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity } from "../store/reducers/entities";

export const fournisseurService = {
  paginateFournisseursList: async (page = 0, filters, returnWithoutDispatch = true) => {
    const { data } = await axios.get("/fournisseurs", {
      params: { page, ...filters },
    });
    dispatch(addEntity({ entity: "fournisseur", data }));
    return data
  },
  getFournisseur: async ({ id }) => {
    return (await axios.get("/fournisseurs/" + id)).data;
  },
  updateFournisseur: async ({ id, nom }) => {
    return (await axios.put("/fournisseurs/" + id, { nom })).data;
  },
  createFournisseur: async ({ nom }) => {
    const { data } = await axios.post("/fournisseurs", { nom });
    return data;
  },
};
