// third-party
import { combineReducers } from "redux";

// project import
import auth from "./auth";
import entities from "./entities";
import menu from "./menu";
import prompt from "./prompt";
import snackbar from "./snackbar";
import totals from "./totals";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  auth,
  snackbar,
  entities,
  totals,
  prompt,
});

export default reducers;
