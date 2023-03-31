import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

// material-ui
import {
  Avatar,
  Badge,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// assets
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { UploadFileOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { axios } from "../../../../../axios";
import { userService } from "../../../../../services/user.service";
import { dispatch } from "../../../../../store";
import { updateUser } from "../../../../../store/reducers/auth";
import { addSnackbar } from "../../../../../store/reducers/snackbar";
import { getBase64 } from "../../../../../utils/imageBase64";

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();
  const { user } = useSelector((e) => e.auth);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [updatingImage, setupdatingImage] = useState(false);
  const [updatingPassword, setupdatingPassword] = useState(false);
  const [fileBase64, setfileBase64] = useState("");
  const [loading, setloading] = useState(false);
  const fileRef = useRef();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    return () => {
      setSelectedIndex(-1);
      setupdatingImage(false);
      setupdatingPassword(false)
      setfileBase64("");
    };
  }, []);

  useEffect(() => {
    if (!fileRef?.current) return;
    const copy = fileRef.current;
    return () => {
      copy.value = "";
    };
  }, [fileRef]);

  return (
    <>
      {loading ? (
        <Grid
          container
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "rgb(0,0,0,.4)",
            zIndex: 1,
            width: "100%",
            height: "100%",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress
            variant="indeterminate"
            style={{ width: 80, height: 80 }}
          />
        </Grid>
      ) : null}
      {updatingImage ? (
        <Stack
          pb={3}
          pt={fileBase64.length > 0 ? (loading ? 3 : 0) : 3}
          px={3}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <input
            hidden
            type="file"
            ref={fileRef}
            onChange={async (e) => {
              if (!e.target.files[0]?.type.startsWith("image")) {
                fileRef.current.value = "";
                setfileBase64("");
              } else {
                setfileBase64(await getBase64(e.target.files[0]));
              }
            }}
          />
          {fileBase64.length > 0 ? (
            <Badge
              badgeContent={
                <IconButton
                  style={{ borderRadius: 50, background: "rgb(0,0,0,.4)" }}
                  onClick={() => setfileBase64("")}
                >
                  <CloseOutlined style={{ color: "white" }} />
                </IconButton>
              }
            >
              <Avatar
                src={fileBase64}
                style={{
                  width: 150,
                  height: 150,
                  maxWidth: 500,
                  borderRadius: 10,
                }}
              />
            </Badge>
          ) : (
            <IconButton
              style={{ padding: 20 }}
              onClick={() => fileRef?.current?.click()}
            >
              <UploadFileOutlined fontSize="large" />
            </IconButton>
          )}
          <Stack direction="row" gap={2}>
            <Button
              color="primary"
              variant="outlined"
              disabled={fileBase64.length === 0}
              onClick={
                fileBase64.length === 0
                  ? () => undefined
                  : () => {
                      try {
                        setloading(true);
                        axios
                          .post("/images", {
                            images: [
                              fileBase64.replace(
                                /data:image\/(.*?);base64,/,
                                ""
                              ),
                            ],
                          })
                          .then(async (res) => {
                            const [img] = res.data;
                            const {
                              data: { image },
                            } = await axios.put("/users", { image: img });
                            dispatch(
                              updateUser({
                                user: {
                                  image,
                                },
                              })
                            );
                            dispatch(
                              addSnackbar({
                                snackbar: {
                                  id: Date.now() * Math.random(),
                                  message: "Photo updated successfully !",
                                  type: "success",
                                },
                              })
                            );
                            setloading(false);
                            setfileBase64("");
                            setupdatingImage(false);
                          });
                      } catch (error) {
                        setloading(false);
                        dispatch(
                          addSnackbar({
                            snackbar: {
                              id: Date.now() * Math.random(),
                              message: error.message,
                              type: "error",
                            },
                          })
                        );
                      }
                    }
              }
            >
              Upload
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => setupdatingImage(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      ) : updatingPassword ? (
        <Formik
          validate={(values) => {
            const errors = {};
            if (!values.oldPassword) {
              errors.oldPassword = "Required";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            if (!values.password.length > 8)
              errors.password = "Password length less than 8";
            if (values.password !== values.cNewPassword) {
              errors.password = "Passwords are not matching";
              errors.cNewPassword = "Passwords are not matching";
            }
            return errors;
          }}
          initialValues={{ password: "", oldPassword: "", cNewPassword: "" }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setSubmitting,
            handleChange,
            handleBlur,
          }) => (
            <Stack
              gap={2}
              alignItems="center"
              justifyContent="start"
              padding={2}
              direction="column"
            >
              <Stack direction="column" gap={0.5}>
                <TextField
                  style={{
                    background: "transparent",
                  }}
                  variant="outlined"
                  type="password"
                  label="Old Password"
                  name="oldPassword"
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography fontSize={10} color="firebrick">
                  {errors.oldPassword &&
                    touched.oldPassword &&
                    errors.oldPassword}
                </Typography>
              </Stack>
              <Stack direction="column" gap={0.5}>
                <TextField
                  style={{
                    background: "transparent",
                  }}
                  variant="outlined"
                  type="password"
                  name="password"
                  label="New Password"
                  color="success"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography fontSize={10} color="firebrick">
                  {errors.password && touched.password && errors.password}
                </Typography>
              </Stack>
              <Stack direction="column" gap={0.5}>
                <TextField
                  style={{
                    background: "transparent",
                  }}
                  variant="outlined"
                  type="password"
                  name="cNewPassword"
                  label="Confirm Password"
                  color="success"
                  value={values.cNewPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography fontSize={10} color="firebrick">
                  {errors.cNewPassword &&
                    touched.cNewPassword &&
                    errors.cNewPassword}
                </Typography>
              </Stack>
              <Stack direction="row" gap={2}>
                <Button
                  onClick={async () => {
                    setSubmitting(true);
                    await userService.updatePassword({
                      nw: values.password,
                      old: values.oldPassword,
                    });
                    setSubmitting(false);
                  }}
                  disabled={
                    isSubmitting ||
                    values.password !== values.cNewPassword ||
                    !values.oldPassword.length ||
                    !values.password.length
                  }
                  type="submit"
                  variant="outlined"
                  color="primary"
                >
                  Update
                </Button>
                <Button variant="outlined" color="error" onClick={()=>setupdatingPassword(false)}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          )}
        </Formik>
      ) : (
        <List
          component="nav"
          sx={{
            p: 0,
            "& .MuiListItemIcon-root": {
              minWidth: 32,
              color: theme.palette.grey[500],
            },
          }}
        >
          {!user.image ? null : (
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => {
                handleListItemClick(event, 0);
                try {
                  setloading(true);
                  axios
                    .put("/users", {
                      image: null,
                    })
                    .then(() => {
                      dispatch(
                        updateUser({
                          user: {
                            image: null,
                          },
                        })
                      );
                      dispatch(
                        addSnackbar({
                          snackbar: {
                            id: Date.now() * Math.random(),
                            message: "Photo deleted",
                            type: "success",
                          },
                        })
                      );
                      setloading(false);
                    });
                } catch (error) {
                  setloading(false);
                  dispatch(
                    addSnackbar({
                      snackbar: {
                        id: Date.now() * Math.random(),
                        message: error.message,
                        type: "error",
                      },
                    })
                  );
                }
              }}
            >
              <ListItemIcon>
                <DeleteOutlined />
              </ListItemIcon>
              <ListItemText primary="Remove Image" />
            </ListItemButton>
          )}
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => {
              handleListItemClick(event, 1);
              setupdatingImage(true);
            }}
          >
            <ListItemIcon>
              <EditOutlined />
            </ListItemIcon>
            <ListItemText primary="Edit Image" />
          </ListItemButton>
          <Divider variant="middle" />
          <ListItemButton
            selected={selectedIndex === 4}
            onClick={(event) => {
              handleListItemClick(event, 4);
              setupdatingPassword(true);
            }}
          >
            <ListItemIcon>
              <EditOutlined />
            </ListItemIcon>
            <ListItemText primary="Modify Password" />
          </ListItemButton>
          <Divider variant="middle" />
          <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlined />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      )}
    </>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func,
};

export default ProfileTab;
