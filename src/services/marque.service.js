import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity } from "../store/reducers/entities";

export const marqueService = {
  paginateMarquesList: async (page = 0, filters, returnWithoutDispatch) => {
    const { data } = await axios.get("/marques", {
      params: { page, ...filters },
    });
    if (returnWithoutDispatch) return data;
    else dispatch(addEntity({ entity: "marque", data }));
  },
  createMarque: async ({ nom }) => {
    const { data } = await axios.post("/marques", { nom });
    return data;
  },
  getMarque: async ({ id }) => {
    return (await axios.get("/marques/" + id)).data;
  },
  updateMarque: async ({ id, nom }) => {
    return (await axios.put("/marques/" + id, { nom })).data;
  },
};
