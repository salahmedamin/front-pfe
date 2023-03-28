import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity, resetEntity } from "../store/reducers/entities";

export const categorieService = {
  paginateCategoriesList: async (page = 0, ...filters) => {
    const {data} = await axios.get("/categories", { params: { page, ...filters } });
    if(page === 0) dispatch(resetEntity({entity: "categorie"}))
    dispatch(addEntity({ entity: "categorie", data }));
  },
};
