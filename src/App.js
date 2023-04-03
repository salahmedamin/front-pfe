// project import
import { Snackbar } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BasicModal } from "./components/Modal";
import { PromptDialog } from "./components/PromptDialog";
import ScrollTop from "./components/ScrollTop";
import Routes from "./routes";
import { authService } from "./services/auth.service";
import { dispatch } from "./store";
import { deleteSnackbar } from "./store/reducers/snackbar";
import ThemeCustomization from "./themes";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const {
    auth: { logged },
    snackbar,
  } = useSelector((s) => s);
  const {prompt} = useSelector(s=>s)
  useEffect(() => {
    if (logged) return;

    //add checktoken endpoint to backend
    (async () => await authService.checkToken())();
  }, [logged]);
  return (
    <ThemeCustomization>
      <ScrollTop>
        <PromptDialog {...prompt} />
        <BasicModal />
        {snackbar.map((e) => (
          <Snackbar
            open={true}
            autoHideDuration={5000}
            onClose={() => dispatch(deleteSnackbar({ id: e.id }))}
            message={e.message}
          />
        ))}
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
