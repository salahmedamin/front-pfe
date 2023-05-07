import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity } from "../store/reducers/entities";

export const categorieService = {
  paginateCategoriesList: async (
    page = 0,
    filters,
    returnWithoutDispatch = false
  ) => {
    const { data } = await axios.get("/categories", {
      params: { page, ...filters },
    });
    if (returnWithoutDispatch) return data;
    else dispatch(addEntity({ entity: "categorie", data }));
  },
  createCategorie: async ({ nom }) => {
    const { data } = await axios.post("/categories", { nom });
    return data;
  },
  getCategorie: async ({ id }) => {
    return (await axios.get("/categories/" + id)).data;
  },
  updateCategorie: async(categorie)=>{
    return (await axios.put("/categories/" + categorie.id,categorie)).data;
  }
};
