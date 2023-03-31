import { DeleteOutlined } from "@ant-design/icons";
import {
  CheckOutlined,
  ClearOutlined,
  CompareArrowsOutlined,
  InsertLinkOutlined
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { axios } from "./axios";
import { OrderStatus } from "./pages/dashboard/OrdersTable";
import { factureService } from "./services/facture.service";
import { tacheService } from "./services/tache.service";
import { store } from "./store";
import { deleteEntity, updateEntity } from "./store/reducers/entities";
import { showPrompt } from "./store/reducers/prompt";

const dispatch = store.dispatch;
const deleteCb = async ({ id, entity }) => {
  dispatch(
    showPrompt({
      title: "Delete " + entity,
      text: "Are you sure you want to proceed with deleting?",
      accept: "Proceed",
      decline: "Cancel",
      acceptCb: async () => {
        dispatch(
          updateEntity({
            entity,
            id: id,
            data: { loading: true },
          })
        );
        await axios.delete(`/${entity}s/${id}`);
        dispatch(deleteEntity({ entity, id }));
      },
    })
  );
};

export const table_data = {
  filters: {
    tache: () => [],
  },
  search: {
    tache: "trigramme",
    produit: "nom",
    categorie: "nom",
    user: "trigramme",
    equipe: "nom",
    facture: "fournisseur",
    fournisseur: "nom",
    marque: "nom",
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
        admin: true,
      },
      {
        id: "delete",
        disablePadding: false,
        label: "Delete",
        admin: true,
      },
    ],
    user: () => [
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
      },
      {
        id: "delete",
        disablePadding: false,
        label: "Delete",
        admin: true,
      },
    ],
    categorie: () => [
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
      },
      {
        id: "delete",
        disablePadding: false,
        label: "Delete",
        admin: true,
      },
    ],
    equipe: () => [
      {
        id: "id",
        disablePadding: false,
        label: "Team ID",
      },
      {
        id: "nom",
        disablePadding: false,
        label: "Name",
      },
      {
        id: "users",
        disablePadding: false,
        label: "Total Users",
      },
      {
        id: "delete",
        disablePadding: false,
        label: "Delete",
        admin: true,
      },
    ],
    produit: () => [
      {
        id: "id",
        disablePadding: false,
        label: "Product ID",
      },
      {
        id: "name",
        disablePadding: false,
        label: "Name",
      },
      {
        id: "marque",
        disablePadding: false,
        label: "Marque",
      },
      {
        id: "quantite",
        disablePadding: false,
        label: "Quantity",
      },
      {
        id: "available",
        disablePadding: false,
        label: "Available Quantity",
      },
      {
        id: "categories",
        disablePadding: false,
        label: "Categories",
      },
      {
        id: "createTask",
        disablePadding: false,
        label: "Request",
      },
      {
        id: "delete",
        disablePadding: false,
        label: "Delete",
        admin: true,
      },
    ],
    facture: () => [
      {
        id: "id",
        disablePadding: false,
        label: "ID",
      },
      {
        id: "fournissuer",
        disablePadding: false,
        label: "Supplier",
      },
      {
        id: "montant",
        disablePadding: false,
        label: "Amount",
      },
      {
        id: "statut",
        disablePadding: false,
        label: "Status",
      },
      {
        id: "markPaid",
        disablePadding: false,
        label: "Mark as paid",
      },
      {
        id: "delete",
        disablePadding: false,
        label: "Delete",
        admin: true,
      },
    ],
    fournisseur: () => [
      {
        id: "id",
        disablePadding: false,
        label: "ID",
      },
      {
        id: "nom",
        disablePadding: false,
        label: "Name",
      },
      {
        id: "total",
        disablePadding: false,
        label: "Total Invoices",
      },
      {
        id: "delete",
        disablePadding: false,
        label: "Delete",
        admin: true,
      },
    ],
    marque: () => [
      {
        id: "id",
        disablePadding: false,
        label: "Brand ID",
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
      },
      {
        id: "delete",
        disablePadding: false,
        label: "Delete",
        admin: true,
      },
    ],
  },
  body: {
    tache: ({ user, produit, quantite, etat, ...row }) => [
      { value: row.id },
      { value: `${user.nom} ${user.prenom}`, admin: true },
      {
        value: (
          <Link
            style={{ color: "inherit" }}
            to={`/manage/produits/?produit=${produit.id}`}
          >
            {produit.nom}
          </Link>
        ),
      },
      { value: quantite },
      {
        value: (
          <Link
            to={`/manage/taches/?etat=${etat}`}
            style={{ color: "inherit" }}
          >
            <OrderStatus
              status={etat === "EN_COURS" ? 0 : etat === "FINIE" ? 1 : 2}
            />
          </Link>
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
                  dispatch(
                    updateEntity({
                      entity: "tache",
                      id: row.id,
                      data: { etat: "FINIE" },
                    })
                  )
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
                  dispatch(
                    updateEntity({
                      entity: "tache",
                      id: row.id,
                      data: { etat: "REJETEE" },
                    })
                  )
                )
              }
            >
              <ClearOutlined fontSize="small" />
            </Button>
          </Stack>
        ),
        admin: true,
      },
      {
        value: (
          <IconButton
            onClick={async () => {
              await deleteCb({ id: row.id, entity: "tache" });
            }}
          >
            <DeleteOutlined />
          </IconButton>
        ),
        admin: true,
      },
    ],
    user: ({ id, trigramme, nom, prenom, equipe }) => [
      { value: id },
      { value: trigramme },
      { value: nom },
      { value: prenom },
      {
        value: (
          <Link
            style={{ textDecoration: "underline", color: "inherit" }}
            to={`/manage/equipes/?nom=${equipe.nom}`}
          >
            {equipe.nom}
          </Link>
        ),
      },
      {
        value: (
          <IconButton
            onClick={async () => {
              await deleteCb({ id, entity: "user" });
            }}
          >
            <DeleteOutlined />
          </IconButton>
        ),
        admin: true,
      },
    ],
    categorie: ({ id, nom, _count: { produits } }) => [
      { value: id },
      { value: nom },
      {
        value: (
          <Link
            style={{ color: "inherit" }}
            to={`/manage/produits/?categories=${id}`}
          >
            {produits}
          </Link>
        ),
      },
      {
        value: (
          <IconButton
            onClick={async () => {
              await deleteCb({ id, entity: "categorie" });
            }}
          >
            <DeleteOutlined />
          </IconButton>
        ),
        admin: true,
      },
    ],
    equipe: ({ id, nom, _count: { users } }) => [
      { value: id },
      { value: nom },
      {
        value: (
          <Link
            style={{ textDecoration: "underline", color: "inherit" }}
            to={`/manage/users?equipe=${nom}`}
          >
            {users}
          </Link>
        ),
      },
      {
        value: (
          <IconButton
            onClick={async () => {
              await deleteCb({ id, entity: "equipe" });
            }}
          >
            <DeleteOutlined />
          </IconButton>
        ),
        admin: true,
      },
    ],
    produit: ({
      id,
      nom,
      marque: { nom: nomMarque, id: marque },
      quantite,
      quantiteEnTachesEnCours,
    }) => [
      { value: id },
      { value: nom },
      {
        value: (
          <Link
            style={{ color: "inherit" }}
            to={`/manage/marques/?marque=${marque}`}
          >
            {nomMarque}
          </Link>
        ),
      },
      { value: quantite },
      { value: quantite - quantiteEnTachesEnCours },
      {
        value: (
          <Link to={`/manage/categories/?produit=${id}`}>
            <IconButton>
              <InsertLinkOutlined />
            </IconButton>
          </Link>
        ),
      },
      {
        value: (
          <IconButton disabled={quantite - quantiteEnTachesEnCours <= 0}>
            <CompareArrowsOutlined />
          </IconButton>
        ),
      },
      {
        value: (
          <IconButton
            onClick={async () => {
              await deleteCb({ id, entity: "produit" });
            }}
          >
            <DeleteOutlined />
          </IconButton>
        ),
        admin: true,
      },
    ],
    fournisseur: ({ id, nom, _count: { factures } }) => [
      { value: id },
      { value: nom },
      {
        value: (
          <Link
            style={{ color: "inherit" }}
            to={`/manage/factures/?fournisseurID=${id}`}
          >
            {factures}
          </Link>
        ),
      },
      {
        value: (
          <IconButton
            onClick={async () => {
              await deleteCb({ id, entity: "fournisseur" });
            }}
          >
            <DeleteOutlined />
          </IconButton>
        ),
        admin: true,
      },
    ],
    marque: ({ id, nom, _count: { produits } }) => [
      { value: id },
      { value: nom },
      {
        value: (
          <Link
            style={{ color: "inherit" }}
            to={`/manage/produits/?marque=${id}`}
          >
            {produits}
          </Link>
        ),
      },
      {
        value: (
          <IconButton
            onClick={async () => {
              await deleteCb({ id, entity: "marque" });
            }}
          >
            <DeleteOutlined />
          </IconButton>
        ),
        admin: true,
      },
    ],
    facture: ({
      id,
      montant,
      fournisseur: { nom, id: fournisseurID },
      statut,
    }) => [
      { value: id },
      {
        value: (
          <Link
            style={{ color: "inherit" }}
            to={`/manage/fournisseurs/?fournisseur=${fournisseurID}`}
          >
            {nom}
          </Link>
        ),
      },
      { value: montant },
      {
        value: (
          <Link
            style={{ color: "inherit" }}
            to={`/manage/factures/?statut=${statut}`}
          >
            <OrderStatus status={statut === "EN_COURS" ? 0 : 1} />
          </Link>
        ),
      },
      {
        value: (
          <Button
            color="success"
            variant="outlined"
            disabled={statut !== "EN_COURS"}
            onClick={() =>
              factureService.acceptFacture(id, () =>
                dispatch(
                  updateEntity({
                    entity: "facture",
                    id,
                    data: { statut: "PAYEE" },
                  })
                )
              )
            }
          >
            <CheckOutlined fontSize="small" />
          </Button>
        ),
      },
      {
        value: (
          <IconButton
            onClick={async () => {
              await deleteCb({ id, entity: "facture" });
            }}
          >
            <DeleteOutlined />
          </IconButton>
        ),
        admin: true,
      },
    ],
  },
};
