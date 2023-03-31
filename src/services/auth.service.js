import { axios } from "../axios";
import { dispatch } from "../store/index";
import { login, logout } from "../store/reducers/auth";
import { resetAllEntities } from "../store/reducers/entities";
import { emptyTotals } from "../store/reducers/totals";
import { countService } from "./count.service";

export const authService = {
  checkToken: async () => {
    try {
      const {data:{ token : newToken} } = await axios.get("/auth");
      if(newToken) localStorage.setItem("token",newToken)
      const token = newToken || localStorage.getItem("token");
      const user = JSON.parse(atob(token.split(".")[1]));
      dispatch(login({ user }));
      await countService.getAndSetTotals();
    } catch (error) {
      dispatch(logout());
    }
  },
  login: async ({ trigramme, password }) => {
    try {
      const {
        data: { token },
      } = await axios.post("/auth", { trigramme, password });
      localStorage.setItem("token", token);
      const user = JSON.parse(atob(token.split(".")[1]));
      dispatch(login({ user }));
      await countService.getAndSetTotals();
      return true;
    } catch (error) {
      dispatch(logout());
      return false;
    }
  },
  logout: async () => {
    try {
      await axios.delete("/auth");
      localStorage.removeItem("token");
      dispatch(logout());
      dispatch(emptyTotals())
      dispatch(resetAllEntities())
    } catch (error) {
      dispatch(logout());
      dispatch(emptyTotals())
      dispatch(resetAllEntities())
    }
  },
};
