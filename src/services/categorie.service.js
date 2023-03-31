import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity } from "../store/reducers/entities";

export const categorieService = {
  paginateCategoriesList: async (page = 0, filters) => {
    const {data} = await axios.get("/categories", { params: { page, ...filters } });
    dispatch(addEntity({ entity: "categorie", data }));
  },
};
