import { Divider, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useSelector } from "react-redux";
import { dispatch } from "../store";
import { hideModal } from "../store/reducers/modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const BasicModal = () => {
  const { open, title, body } = useSelector((s) => s.modal);
  const handleClose = () => dispatch(hideModal());

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        disableAutoFocus={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          display={"flex"}
          flexDirection="column"
          alignItems="flex-start"
          justifyContent={"flex-start"}
          gap={2}
          container
          xs={11}
          sm={8}
          md={6}
          lg={4}
          sx={style}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            fontWeight={"bold"}
          >
            {title || "Text in a modal"}
          </Typography>
          <Divider style={{ width: "100%" }} variant="fullWidth" />
          {body || (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          )}
        </Grid>
      </Modal>
    </div>
  );
};
