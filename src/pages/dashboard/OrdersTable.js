import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// material-ui
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

// third-party

// project import
import { useSelector } from "react-redux";
import Dot from "../../components/@extended/Dot";

//Services
import { ArrowBack } from "@mui/icons-material";
import { useLocation } from "react-router";
import { categorieService } from "../../services/categorie.service";
import { tacheService } from "../../services/tache.service";
import { userService } from "../../services/user.service";
import { table_data } from "../../table_data";
//import { categorieService } from "../../services/categorie.service";
//import { equipeService } from "../../services/equipe.service";
//import { fournisseurService } from "../../services/fournisseur.service";
//import { factureService } from "../../services/facture.service";
//import { marqueService } from "../../services/marque.service";
//import { produitService } from "../../services/produit.service";

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const entityDataCallback = (user) => ({
  dashboard: {
    tache: async (page) =>
      await tacheService[
        user.isAdmin ? "getAdminUndergoingTasks" : "getUserRecentTasks"
      ](page),
  },
  manage: {
    tache: async(page)=> await tacheService.paginateTasksList(page),
    user: async(page)=>await userService.paginateUsersList(page),
    categorie: async(page)=>await categorieService.paginateCategoriesList(page)
  },
});

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ entity }) {
  const { user } = useSelector((s) => s.auth);
  return (
    <TableHead>
      <TableRow>
        {table_data.head[entity]().map((headCell) =>
          headCell.admin && !user.isAdmin ? null : (
            <TableCell
              key={headCell.id}
              align={"center"}
              padding={headCell.disablePadding ? "none" : "normal"}
            >
              {headCell.label}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER TABLE - STATUS ||============================== //

export const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = "warning";
      title = "Pending";
      break;
    case 1:
      color = "success";
      title = "Approved";
      break;
    case 2:
      color = "error";
      title = "Rejected";
      break;
    default:
      color = "primary";
      title = "None";
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number,
};

// ==============================|| ORDER TABLE ||============================== //

export const OrdersTable = ({ entity }) => {
  const [loading, setloading] = useState(false);
  const { user } = useSelector((s) => s.auth);
  const { data, page } = useSelector((s) => s.entities[entity]);
  const location = useLocation()
  const isDashboard = location.pathname === "/" || location.pathname.match("dashboard")
  useEffect(() => {
    (async () => {
      setloading(true);
      await entityDataCallback(user)[isDashboard ? "dashboard" : "manage"][
        entity
      ](page);
      setloading(false);
    })();
  }, [page, entity]);

  const uniq = (arr, track = new Set()) =>
    arr.filter(({ id }) => (track.has(id) ? false : track.add(id)));

  return (
    <Box display={"flex"} justifyContent="center" alignItems="center" flexDirection={"column"} gap={2}>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            "& .MuiTableCell-root:first-child": {
              pl: 2,
            },
            "& .MuiTableCell-root:last-child": {
              pr: 3,
            },
          }}
        >
          <OrderTableHead entity={entity} />
          <TableBody>
            {loading ? (
              <Stack
                padding={3}
                display="flex"
                width="100%"
                justifyContent="center"
                alignItems={"center"}
              >
                <CircularProgress variant="indeterminate" />
              </Stack>
            ) : data.length === 0 ? (
              <Stack justifyContent={"center"} width={"100%"} padding={2}>No data to display</Stack>
            ) : (
              uniq(data).map((row, index) => {
                return (
                  <TableRow
                    key={row.id}
                    hover
                    role="checkbox"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    tabIndex={-1}
                  >
                    {table_data.body[entity](row).map((e) =>
                      e.admin && !user.isAdmin ? null : (
                        <TableCell align="center">{e.value}</TableCell>
                      )
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction={"row"} alignItems="center" justifyContent={"center"} margin={2}>
              <IconButton disabled={page <= 0}>
                <ArrowBack fontSize="medium" />
              </IconButton>
              <IconButton disabled={data.length % 20 > 0 || data?.length === 0} style={{transform: "rotate(180deg)"}}>
                <ArrowBack fontSize="medium" />
              </IconButton>
      </Stack>
    </Box>
  );
}
