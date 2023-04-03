import { Stack, Typography } from "@mui/material";
import React from "react";
import MainCard from "./MainCard";

export const NotFound = () => {
  return (
    <MainCard sx={{ mt: 2 }} content={false}>
      <Stack padding={4} gap={3}>
        <Typography variant="h2">NOT FOUND</Typography>
        The requested page, may have been temporairly moved to another location
        or deleted, we know nothing more.
      </Stack>
    </MainCard>
  );
};
