import { axios } from "../axios";
import { dispatch } from "../store";
import { addEntity } from "../store/reducers/entities";
import { addSnackbar } from "../store/reducers/snackbar";

export const userService = {
  paginateUsersList: async (page = 0, filters) => {
    const { data } = await axios.get("/users", {
      params: { page, ...filters },
    });
    dispatch(addEntity({ entity: "user", data }));
  },
  updatePassword: async ({ old, nw }) => {
    await axios.put("/users", { oldPassword: old, password: nw });
    dispatch(
      addSnackbar({
        snackbar: { message: "Password updated", type: "success" },
      })
    );
  },
  updateUser: async (user) => {
    await axios.put("/users/"+user.id, user);
    dispatch(
      addSnackbar({
        snackbar: { message: "Updated", type: "success" },
      })
    );
  },
  getUser: async ({ id }) => {
    return (await axios.get("/users/" + id)).data;
  },
  createUser: async (user) => {
    //{nom, prenom, equipe, trigramme}
    const { data } = await axios.post("/users", {
      ...user,
      password: "SIMPLE_PASSWORD"
    });
    return data;
  },
};
