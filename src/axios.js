import a from "axios";
import { dispatch } from "./store";
import { addSnackbar } from "./store/reducers/snackbar";

const axios = a.create({
  baseURL: process.env.REACT_APP_BACKEND,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});
axios.interceptors.request.use((c) => {
  c.headers.Authorization = localStorage.getItem("token");
  return c;
});
axios.interceptors.response.use(
  (response) => response,
  (err) => {
    dispatch(
      addSnackbar({
        snackbar: { message: err.response.data.message || "An error occured" },
      })
    );
    throw err
  }
);

export { axios };

