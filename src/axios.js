import a from "axios";

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

export { axios };

