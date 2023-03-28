import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity, resetEntity } from "../store/reducers/entities";

export const tacheService = {
  getAdminUndergoingTasks: async (page) => {
    const { data } = await axios.get(`/taches?etat=EN_COURS&page=${page}`);
    dispatch(addEntity({ data, entity: "tache" }));
  },
  getAdminRejectedTasks: async (page) => {
    const { data } = await axios.get(`/taches?etat=REJETEE&page=${page}`);
    dispatch(addEntity({ data, entity: "tache" }));
  },
  getAdminFinishedTasks: async (page) => {
    const { data } = await axios.get(`/taches?etat=FINIE&page=${page}`);
    dispatch(addEntity({ data, entity: "tache" }));
  },
  getUserRecentTasks: async (page) => {
    const { data } = await axios.get(`/taches?page=${page}`);
    dispatch(addEntity({ data, entity: "tache" }));
  },
  acceptTask: async (taskID, cb) => {
    await axios.put(`/taches/${taskID}`, { etat: "FINIE" });
    if (typeof cb === "function") cb();
  },
  rejectTask: async (taskID, cb) => {
    await axios.put(`/taches/${taskID}`, { etat: "REJETEE" });
    if (typeof cb === "function") cb();
  },
  paginateTasksList: async (page = 0) => {
    const {data} = await axios.get("/taches", { params: { page } });
    if(page === 0) dispatch(resetEntity({entity: "tache"}))
    dispatch(addEntity({ entity: "tache", data }));
  },
};
