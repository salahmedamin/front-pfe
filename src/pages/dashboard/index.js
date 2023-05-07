// material-ui
import { Grid, Typography } from "@mui/material";

// project import
import AnalyticEcommerce from "../../components/cards/statistics/AnalyticEcommerce";
import MainCard from "../../components/MainCard";
import { OrdersTable } from "./OrdersTable";

// assets
import { useSelector } from "react-redux";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const {
    totals,
    auth: { user },
  } = useSelector((s) => s);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      {Object.keys(totals)
        .filter((e) => totals[e] !== null)
        .map((e, i) => (
          <Grid key={i} item xs={12} sm={5} md={3} lg={3} alignItems={"space-between"}>
            <AnalyticEcommerce
              title={`${e.replace(/_/," ")}`.toUpperCase()}
              count={totals[e]}
              //   percentage={59.3}
              //   extra="35,000"
            />
          </Grid>
        ))}

      <Grid
        item
        md={8}
        sx={{ display: { sm: "none", md: "block", } }}
      />

      {/* row 3 */}
      <Grid item xs={12} md={7}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">
              {user.isAdmin ? "Undergoing Tasks" : "Products"}
            </Typography>
          </Grid>
          {/* <Grid item>
            <TextField label="Search" variant="outlined" />
          </Grid> */}
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable
            create={false}
            enableSearch={false}
            paginate={false}
            entity={user.isAdmin ? "tache" : "produit"}
            filters={{
              etat: user.isAdmin ? "EN_COURS" : undefined,
              gt: user.isAdmin ? undefined : 0,
            }}
          />
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={5}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">
              {user.isAdmin ? "Teams List" : "Your recent tasks"}
            </Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable
            create={false}
            enableSearch={false}
            paginate={false}
            entity={user.isAdmin ? "equipe" : "tache"}
            filters={{ gt: user.isAdmin ? undefined : 0 }}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
