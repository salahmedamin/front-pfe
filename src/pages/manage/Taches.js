import { Grid } from "@mui/material";
import MainCard from "../../components/MainCard";
import { OrdersTable } from "../dashboard/OrdersTable";

export const ManageTaches = () => {
//   const { user } = useSelector((e) => e.auth);
  return (
    <Grid item xs={12} md={7} lg={8}>
      <MainCard sx={{ mt: 2 }} content={false}>
        <OrdersTable entity={"tache"} />
      </MainCard>
    </Grid>
  );
};
