import PropTypes from "prop-types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

//perfect scrollbar

// material-ui
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";

// third-party

// project import
import { useSelector } from "react-redux";
import Dot from "../../components/@extended/Dot";

//Services
import { CloseOutlined } from "@ant-design/icons";
import {
  AddOutlined,
  ArrowBack,
  CreateOutlined
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { categorieService } from "../../services/categorie.service";
import { demande_restockService } from "../../services/demande_restock.service";
import { equipeService } from "../../services/equipe.service";
import { factureService } from "../../services/facture.service";
import { fournisseurService } from "../../services/fournisseur.service";
import { marqueService } from "../../services/marque.service";
import { productService } from "../../services/produit.service";
import { tacheService } from "../../services/tache.service";
import { userService } from "../../services/user.service";
import { dispatch } from "../../store";
import { paginateEntity, resetEntity } from "../../store/reducers/entities";
import { showModal } from "../../store/reducers/modal";
import { table_data } from "../../table_data";
import { uniq } from "../../utils/unique";
import { ModalCreateOrUpdate } from "../modal/Create/ModalCreateOrUpdate";
//import { categorieService } from "../../services/categorie.service";
//import { equipeService } from "../../services/equipe.service";
//import { fournisseurService } from "../../services/fournisseur.service";
//import { factureService } from "../../services/facture.service";
//import { marqueService } from "../../services/marque.service";
//import { produitService } from "../../services/produit.service";

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const entityDataCallback = () => ({
  tache: async (page, filters) =>
    await tacheService.paginateTasksList(page, filters),
  user: async (page, filters) =>
    await userService.paginateUsersList(page, filters),
  categorie: async (page, filters) =>
    await categorieService.paginateCategoriesList(page, filters),
  equipe: async (page, filters) =>
    await equipeService.paginateEquipeList(page, filters),
  produit: async (page, filters) =>
    await productService.paginateProductsList(page, filters),
  marque: async (page, filters) =>
    await marqueService.paginateMarquesList(page, filters),
  facture: async (page, filters) =>
    await factureService.paginateFacturesList(page, filters),
  fournisseur: async (page, filters) =>
    await fournisseurService.paginateFournisseursList(page, filters),
  demande_restock: async(page, filters)=>await demande_restockService.paginateDemandeRestockList(page, filters)
});

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ entity }) {
  const { user } = useSelector((s) => s.auth);
  return (
    <TableHead
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        boxShadow: "0px -2px 15px 1px rgb(0,0,0,.4)",
      }}
    >
      <TableRow style={{ backgroundColor: "white" }}>
        {table_data.head[entity]().map((headCell, i) =>
          ((headCell.admin || i === 0) && !user.isAdmin) ||
          headCell.canEdit === false ? null : i === 0 ? (
            <TableCell key={"edit"} align={"center"} padding={"none"}>
              Edit
            </TableCell>
          ) : (
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

export const OrdersTable = React.memo(
  ({
    entity,
    paginate = true,
    filters,
    enableSearch = true,
    create = true,
  }) => {
    //local variables
    const [loading, setloading] = useState(false);
    //if user has pressed search with what's already in search box
    const [dirtySearch, setdirtySearch] = useState(false);
    const [searchValue, setsearchValue] = useState("");
    const [fetchedPages, setfetchedPages] = useState([]);

    //redux variables
    const { user } = useSelector((s) => s.auth);
    const { data, page } = useSelector((s) => s.entities[entity]);

    //react router navigation hook
    //used to prevent page from reloading (hot reload)
    const nav = useNavigate();

    //react router hook to get information about current path
    const location = useLocation();

    //usememo is used to prevent react from re-calculating expensive variables
    const locationSearch = useMemo(
      () =>
        location.search
          .slice(1)
          .split("&")
          .map((e) => e.split("="))
          .reduce((t, n) => (t = { ...t, [n[0]]: n[1] }), {}),
      [location.search]
    );
    const backendFilters = useMemo(
      () => ({
        ...locationSearch,
        ...filters,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [locationSearch]
    );
    const dataToMap = useMemo(() => uniq(data), [data]);
    const cannotCreateEntities = useMemo(() => ["tache","demande_restock"], []);
    //usecallback is same as usememo but for functions to avoid unneeded rerendering
    //onSearch
    const onSearch = useCallback(
      async ({ reset } = { reset: false }) => {
        if (reset) setsearchValue("");
        nav({
          search: createSearchParams({
            ...backendFilters,
            [table_data.search[entity]]: reset ? "" : searchValue,
          }).toString(),
        });
        dispatch(
          resetEntity({
            entity,
          })
        );
      },
      [backendFilters, searchValue, entity, nav]
    );

    //track what has changed
    const previous = useRef({ page, entity, backendFilters }).current;
    //paginateCb
    const paginateCb = useCallback(async () => {
      if (
        fetchedPages.includes(page) &&
        previous.entity === entity &&
        previous.backendFilters === backendFilters
      )
        return;
      //set new values to keep track
      previous.entity = entity;
      previous.page = page;
      previous.backendFilters = backendFilters;
      //--------------------------//
      setloading(true);
      await entityDataCallback(user)[entity](page, backendFilters);
      setfetchedPages((e) => [...e, page]);
      setloading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, entity, page, backendFilters]);

    //when page changes, including page 0,  execute pagination callback
    useEffect(() => {
      paginateCb();
    }, [page, paginateCb, location]);

    //filters are combined from ?query=1 and passed "filters" prop into backendFilters
    //when backendFilters changes, reset current entity
    //set search value to match path search term
    useEffect(() => {
      dispatch(resetEntity({ entity }));
      setsearchValue(backendFilters[table_data.search[entity]] || "");
      setfetchedPages([]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search, entity]);

    return (
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
        gap={2}
        position="relative"
      >
        {loading ? (
          <Stack
            padding={3}
            display="flex"
            width="100%"
            justifyContent="center"
            alignItems={"center"}
            position="absolute"
            height="100%"
            bgcolor="rgb(0,0,0,.4)"
            zIndex={2}
          >
            <CircularProgress variant="indeterminate" />
          </Stack>
        ) : null}
        {/* SEARCH AND FILTER */}
        {!enableSearch ? null : (
          <Stack
            direction={"row"}
            justifyContent="space-between"
            width="100%"
            padding={2}
          >
            {/* <Button
              color="secondary"
              variant="text"
              style={{
                alignItems: "center",
                gap: 10,
              }}
            >
              <FilterListOutlined />
              <Typography>Filter</Typography>
            </Button> */}
            <Stack direction={"row"} gap={1}>
              <TextField
                autoComplete={"false"}
                variant="outlined"
                type="text"
                label={`Search using ${table_data.search[entity]}`}
                value={searchValue}
                onChange={(e) => {
                  setsearchValue(e.target.value);
                  setdirtySearch(true);
                }}
                InputProps={{
                  endAdornment: !searchValue.length ? null : (
                    <InputAdornment>
                      <IconButton onClick={() => onSearch({ reset: true })}>
                        <CloseOutlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                onClick={() => {
                  onSearch();
                  setdirtySearch(false);
                }}
                disabled={loading || !searchValue.length || !dirtySearch}
                color="primary"
                variant="outlined"
              >
                Search
              </Button>
            </Stack>
            {!create ||
            cannotCreateEntities.includes(entity) ||
            !user.isAdmin ? null : (
              <Button
                color="primary"
                variant="text"
                style={{
                  alignItems: "center",
                  gap: 10,
                }}
                onClick={() =>
                  dispatch(
                    showModal({
                      title: "Add new " + entity,
                      body: <ModalCreateOrUpdate entity={entity} />,
                    })
                  )
                }
              >
                <AddOutlined />
                <Typography>Create</Typography>
              </Button>
            )}
          </Stack>
        )}
        {/* Table */}
        <TableContainer
          sx={{
            width: "100%",
            overflowX: "auto",
            position: "relative",
            display: "block",
            maxWidth: "100%",
            "& td, & th": { whiteSpace: "nowrap" },
            maxHeight: 540,
            overflowY: "scroll",
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
            <TableBody
              sx={{
                maxHeight: 420,
                overflowY: "scroll",
              }}
            >
              {dataToMap.length === 0 ? (
                <Stack justifyContent={"center"} width={"100%"} padding={2}>
                  No data to display
                </Stack>
              ) : (
                dataToMap.slice(page * 20, page * 20 + 20).map((row, index) => {
                  return (
                    <TableRow
                      key={row.id}
                      hover
                      role="checkbox"
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        position: "relative",
                        transition: ".3s ease all",
                      }}
                      tabIndex={-1}
                    >
                      {row.loading ? (
                        <Stack
                          position={"absolute"}
                          width="100%"
                          height="100%"
                          zIndex={1}
                          alignItems="center"
                          justifyContent={"center"}
                          bgcolor="rgb(0,0,0,.4)"
                        >
                          <CircularProgress size={20} />
                        </Stack>
                      ) : null}
                      {table_data.body[entity](row).map((e, i) =>
                        ((e.admin || i === 0) && !user.isAdmin) ||
                        e.canEdit === false ? null : i === 0 ? (
                          <TableCell key={i} align="center">
                            <IconButton
                              onClick={() =>
                                dispatch(
                                  showModal({
                                    title: "Updating",
                                    body: (
                                      <ModalCreateOrUpdate
                                        entity={entity}
                                        isUpdating={true}
                                        id={e.value}
                                      />
                                    ),
                                  })
                                )
                              }
                            >
                              <CreateOutlined />
                            </IconButton>
                          </TableCell>
                        ) : (
                          <TableCell key={i} align="center">
                            {e.value}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* PAGINATE AND CREATE */}
        {!paginate ? null : (
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"center"}
            margin={2}
            padding={1}
            width={"100%"}
          >
            <Stack direction={"row"} justifyContent="center">
              <IconButton
                disabled={page <= 0}
                onClick={() =>
                  dispatch(paginateEntity({ entity, decrement: true }))
                }
              >
                <ArrowBack fontSize="medium" />
              </IconButton>
              <IconButton
                disabled={
                  (dataToMap.length % 20 > 0 || dataToMap?.length === 0) &&
                  !fetchedPages.includes(page + 1)
                }
                style={{ transform: "rotate(180deg)" }}
                onClick={() =>
                  dispatch(
                    paginateEntity({
                      entity,
                      increment: true,
                    })
                  )
                }
              >
                <ArrowBack fontSize="medium" />
              </IconButton>
            </Stack>
            <Box />
          </Stack>
        )}
      </Box>
    );
  },
  (prev, next) => {
    return (
      prev.entity === next.entity &&
      prev.paginate === next.paginate &&
      prev.filters === next.filters &&
      prev.enableSearch === next.enableSearch &&
      prev.create === next.create
    );
  }
);
