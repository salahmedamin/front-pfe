import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity } from "../store/reducers/entities";

export const factureService = {
  paginateProductsList: async (page = 0, filters) => {
    const { data } = await axios.get("/factures", {
      params: { page, ...filters },
    });
    dispatch(addEntity({ entity: "facture", data }));
  },
  acceptFacture: async (factID, cb) => {
    await axios.put(`/factures/${factID}`, { etat: "PAYEE" });
    if (typeof cb === "function") cb();
  }
};
