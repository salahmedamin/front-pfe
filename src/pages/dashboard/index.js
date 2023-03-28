// material-ui
import {
  Avatar,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Typography
} from "@mui/material";

// project import
import AnalyticEcommerce from "../../components/cards/statistics/AnalyticEcommerce";
import MainCard from "../../components/MainCard";
import { OrdersTable } from "./OrdersTable";

// assets
import {
  GiftOutlined,
  MessageOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

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
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title={`${e}`.toUpperCase()}
              count={totals[e]}
              //   percentage={59.3}
              //   extra="35,000"
            />
          </Grid>
        ))}

      <Grid
        item
        md={8}
        sx={{ display: { sm: "none", md: "block", lg: "none" } }}
      />

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">
              {user.isAdmin ? "Undergoing" : "Your Recent"} Tasks
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Search"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable entity={"tache"} />
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">
              {user.isAdmin ? "Teams List" : "Products you demanded"}
            </Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              "& .MuiListItemButton-root": {
                py: 1.5,
                "& .MuiAvatar-root": avatarSX,
                "& .MuiListItemSecondaryAction-root": {
                  ...actionSX,
                  position: "relative",
                },
              },
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: "success.main",
                    bgcolor: "success.lighter",
                  }}
                >
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">Order #002434</Typography>
                }
                secondary="Today, 2:00 AM"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    78%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: "primary.main",
                    bgcolor: "primary.lighter",
                  }}
                >
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">Order #984947</Typography>
                }
                secondary="5 August, 1:45 PM"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    8%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: "error.main",
                    bgcolor: "error.lighter",
                  }}
                >
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">Order #988784</Typography>
                }
                secondary="7 hours ago"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    16%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
