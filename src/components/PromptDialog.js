import { ClickAwayListener } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { dispatch } from "../store";
import { hidePrompt } from "../store/reducers/prompt";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PromptDialog = ({
  title = "Prompt dialog",
  text = "Are you sure you want to do this",
  accept = "YES",
  decline = "NO",
  acceptCb,
  declineCb,
  open,
}) => {
  const [loading, setloading] = React.useState(false);

  const handleClose = () => {
    dispatch(hidePrompt());
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <ClickAwayListener onClickAway={handleClose}>
        <>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              variant="outlined"
              onClick={async () => {
                if (typeof declineCb === "function") await declineCb();
                handleClose();
              }}
            >
              {decline}
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={async () => {
                if (typeof acceptCb === "function") await acceptCb();
                handleClose();
              }}
            >
              {accept}
            </Button>
          </DialogActions>
        </>
      </ClickAwayListener>
    </Dialog>
  );
};
