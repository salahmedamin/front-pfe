import { axios } from "../axios";
import { dispatch } from "../store/index";
import { emptyTotals, setTotals } from "../store/reducers/totals";

export const countService = {
  getAndSetTotals: async (emptify = false) => {
    try {
      if (emptify) {
        dispatch(emptyTotals());
        return;
      }
      const { data } = await axios.get("/count");
      dispatch(setTotals({ totals: data }));
      return true;
    } catch (error) {
      return false;
    }
  },
};
