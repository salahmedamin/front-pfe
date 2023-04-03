import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity } from "../store/reducers/entities";

export const factureService = {
  paginateFacturesList: async (page = 0, filters) => {
    const { data } = await axios.get("/factures", {
      params: { page, ...filters },
    });
    dispatch(addEntity({ entity: "facture", data }));
  },
  acceptFacture: async (factID, cb) => {
    await axios.put(`/factures/${factID}`, { etat: "PAYEE" });
    if (typeof cb === "function") cb();
  },
  getFacture: async ({ id }) => {
    return (await axios.get("/factures/" + id)).data;
  },
  createFacture: async ({ montant, fournisseur }) => {
    const { data } = await axios.post("/factures", { montant, fournisseur });
    return data;
  },
};
