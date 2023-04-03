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
  createProduct: async ({ marque, nom, quantite, categories }) => {
    const { data } = await axios.post("/produits", {
      marque,
      nom,
      quantite: parseInt(quantite),
      categories,
    });
    return data;
  },
  getProduct: async ({ id }) => {
    return (await axios.get("/produits/" + id)).data;
  },
  updateProduct: async (product) => {
    const { data } = await axios.put("/produits/" + product.id, product);
    return data;
  },
};
