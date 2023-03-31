import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity } from "../store/reducers/entities";

export const marqueService = {
  paginateMarquesList: async (page = 0, filters) => {
    const { data } = await axios.get("/marques", {
      params: { page, ...filters },
    });
    dispatch(addEntity({ entity: "marque", data }));
  },
};
