import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity, updateEntity } from "../store/reducers/entities";
import { hideModal } from "../store/reducers/modal";
import { addSnackbar } from "../store/reducers/snackbar";

export const tacheService = {
  paginateTasksList: async (page = 0, filters) => {
    const { data } = await axios.get("/taches", {
      params: { page, ...filters },
    });
    dispatch(addEntity({ entity: "tache", data }));
  },
  acceptTask: async (taskID, cb) => {
    await axios.put(`/taches/${taskID}`, { etat: "FINIE" });
    if (typeof cb === "function") cb();
  },
  rejectTask: async (taskID, cb) => {
    await axios.put(`/taches/${taskID}`, { etat: "REJETEE" });
    if (typeof cb === "function") cb();
  },
  createTask: async (produit, quantite) => {
    try {
      await axios.post("/taches", { produit, quantite });
      dispatch(
        addSnackbar({
          snackbar: {
            id: Date.now() * Math.random(),
            message: "Task created",
            type: "success",
          },
        })
      );
      dispatch(
        updateEntity({
          entity: "produit",
          id: produit,
          data: {
            quantiteEnTachesEnCours: (e) => e + quantite,
          },
        })
      );
      dispatch(hideModal());
    } catch (error) {
      console.log(error);
    }
  },
  getTache: async ({ id }) => {
    return (await axios.get("/taches/" + id)).data;
  },
};
