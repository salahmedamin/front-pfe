import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity } from "../store/reducers/entities";

export const equipeService = {
  paginateEquipeList: async (page = 0, filters) => {
    const {data} = await axios.get("/equipes", { params: { page, ...filters } });
    dispatch(addEntity({ entity: "equipe", data }));
    return data
  },
  createEquipe: async({nom})=>{
    const {data} = await axios.post("/equipes",{nom})
    return data
  },
  getEquipe: async({ id }) =>{
    return (await axios.get("/equipes/"+id)).data
  }
};
