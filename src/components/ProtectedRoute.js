import { CircularProgress, Stack } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children, role = "user" }) => {
  const { logged, user } = useSelector((s) => s.auth);
  const userRole = useMemo(() => (user?.isAdmin ? role : "user"), [user, role]);
  return logged === null ? (
    <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"} width={"100vw"}>
      <CircularProgress variant="indeterminate" size={100} />
    </Stack>
  ) : !logged ? (
    <Navigate to="/login" />
  ) : userRole !== role ? (
    <Navigate to="/" />
  ) : (
    children
  );
};
