import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity, updateEntity } from "../store/reducers/entities";
import { hideModal } from "../store/reducers/modal";
import { addSnackbar } from "../store/reducers/snackbar";

export const demande_restockService = {
    paginateDemandeRestockList: async (page = 0, filters) => {
        const { data } = await axios.get("/demande_restocks", { params: { page, ...filters } });
        dispatch(addEntity({ entity: "demande_restock", data }));
    },
    fulfillDemandeRestock: async({demande})=>{
        /*const {data} = */
        await axios.put("/demande_restocks/"+demande)
        dispatch(
            addSnackbar({
                snackbar: {
                    id: Date.now() * Math.random(),
                    message: "Refill request fulfilled",
                    type: "success",
                },
            })
        );
        dispatch(
            updateEntity({
                entity: "demande_restock",
                id: demande,
                data: {
                    fulfilled: true
                }
            })
        );
    },
    createDemandeRestock: async ({ produit, quantite }) => {
        const { data } = await axios.post("/demande_restocks", { produit, quantite })
        dispatch(
            addSnackbar({
                snackbar: {
                    id: Date.now() * Math.random(),
                    message: "Refill request created",
                    type: "success",
                },
            })
        );
        dispatch(
            addEntity({
                entity: "demande_restock",
                data: data
            })
        );
        dispatch(hideModal());
    }
};
