import {
  CheckOutlined,
  ClearOutlined
} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { OrderStatus } from "./pages/dashboard/OrdersTable";
import { tacheService } from "./services/tache.service";
import { store } from "./store";
import { deleteEntity } from "./store/reducers/entities";

const dispatch = store.dispatch;

export const table_data = {
  filters: {
    tache: () => [],
  },
  head: {
    tache: () => [
      {
        id: "id",
        disablePadding: false,
        label: "Task ID",
      },
      {
        id: "user",
        disablePadding: true,
        label: "User",
        admin: true,
      },
      {
        id: "product",
        disablePadding: true,
        label: "Product Name",
      },
      {
        id: "quantity",
        disablePadding: false,
        label: "Quantity",
      },
      {
        id: "status",
        disablePadding: false,
        label: "Status",
      },
      {
        id: "action",
        disablePadding: false,
        label: "Action",
      },
    ],
    user: ()=>[
      {
        id: "id",
        disablePadding: false,
        label: "User ID",
      },
      {
        id: "trigramme",
        disablePadding: false,
        label: "Trigramme",
      },
      {
        id: "name",
        disablePadding: true,
        label: "Name",
        admin: true,
      },
      {
        id: "surname",
        disablePadding: true,
        label: "Surname",
      },
      {
        id: "team",
        disablePadding: false,
        label: "Team",
      }
    ],
    categorie: ()=>[
      {
        id: "id",
        disablePadding: false,
        label: "Category ID",
      },
      {
        id: "nom",
        disablePadding: false,
        label: "Name",
      },
      {
        id: "total",
        disablePadding: false,
        label: "Total Products",
      }
    ]
  },
  body: {
    tache: ({ user, produit, quantite, etat, ...row }) => [
      { value: row.id },
      { value: `${user.nom} ${user.prenom}`, admin: true },
      { value: produit.nom },
      { value: quantite },
      {
        value: (
          <OrderStatus
            status={etat === "EN_COURS" ? 0 : etat === "FINIE" ? 1 : 2}
          />
        ),
      },
      {
        value: (
          <Stack direction={"row"} gap={1} justifyContent="center">
            <Button
              color="success"
              variant="outlined"
              disabled={etat !== "EN_COURS"}
              onClick={() =>
                tacheService.acceptTask(row.id, () =>
                  dispatch(deleteEntity({ entity: "tache", id: row.id }))
                )
              }
            >
              <CheckOutlined fontSize="small" />
            </Button>
            <Button
              color="error"
              variant="outlined"
              disabled={etat !== "EN_COURS"}
              onClick={() =>
                tacheService.rejectTask(row.id, () =>
                  dispatch(deleteEntity({ entity: "tache", id: row.id }))
                )
              }
            >
              <ClearOutlined fontSize="small" />
            </Button>
          </Stack>
        ),
        admin: true,
      },
    ],
    user: ({id, trigramme, nom, prenom, equipe})=>[
      { value: id },
      { value: trigramme },
      { value: nom },
      { value: prenom },
      { value: equipe.nom },
    ],
    categorie: ({id, nom, _count:{ produits }})=>[
      { value: id },
      { value: nom },
      { value: produits },
    ]
  },
};
