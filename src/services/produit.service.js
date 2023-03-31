import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity } from "../store/reducers/entities";

export const productService = {
  paginateProductsList: async (page = 0, filters) => {
    const { data } = await axios.get("/produits", {
      params: { page, ...filters },
    });
    dispatch(addEntity({ entity: "produit", data }));
  },
};
