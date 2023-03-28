import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity, resetEntity } from "../store/reducers/entities";

export const userService = {
  paginateUsersList: async (page = 0, ...filters) => {
    const {data} = await axios.get("/users", { params: { page, ...filters } });
    if(page === 0) dispatch(resetEntity({entity: "user"}))
    dispatch(addEntity({ entity: "user", data }));
  },
};
