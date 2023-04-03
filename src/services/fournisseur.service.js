import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity } from "../store/reducers/entities";

export const fournisseurService = {
  paginateFournisseursList: async (page = 0, filters) => {
    const { data } = await axios.get("/fournisseurs", {
      params: { page, ...filters },
    });
    dispatch(addEntity({ entity: "fournisseur", data }));
  },
  getFournisseur: async ({ id }) => {
    return (await axios.get("/fournisseurs/" + id)).data;
  },
  createFournisseur: async ({ nom }) => {
    const { data } = await axios.post("/founisseurs", { nom });
    return data;
  },
};
