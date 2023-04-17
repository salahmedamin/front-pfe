// assets
import {
  CategoryOutlined,
  FactoryOutlined,
  PersonOutlined,
  ReceiptLongOutlined,
  Replay,
  TaskAltOutlined,
  WidgetsOutlined,
  WorkspacesOutlined
} from "@mui/icons-material";

// icons
const icons = {
  PersonOutlined,
  CategoryOutlined,
  FactoryOutlined,
  WidgetsOutlined,
  WorkspacesOutlined,
  TaskAltOutlined,
  ReceiptLongOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const products = {
  id: "product",
  title: "Product Related",
  type: "group",
  children: [
    {
      id: "categorie",
      title: "Categories",
      type: "item",
      url: "/manage/categories",
      icon: icons.CategoryOutlined,
    },
    {
      id: "marque",
      title: "Brands",
      type: "item",
      url: "/manage/marques",
      icon: icons.FactoryOutlined,
    },
    {
      id: "produit",
      title: "Products",
      type: "item",
      url: "/manage/produits",
      icon: icons.WidgetsOutlined,
    },
  ],
};

const rh = ({ isAdmin }) => ({
  id: "rh",
  title: "HR & Tasks",
  type: "group",
  children: [
    {
      id: "equipe",
      title: "Teams",
      type: "item",
      url: "/manage/equipes",
      icon: icons.WorkspacesOutlined,
    },
    {
      id: "user",
      title: "Users",
      type: "item",
      url: "/manage/users",
      icon: icons.PersonOutlined,
    },
    ...(!isAdmin
      ? []
      : [
          {
            id: "refill",
            title: "Products Refill",
            type: "item",
            url: "/manage/demande_restocks",
            icon: Replay,
          },
        ]),
    ...(!isAdmin
      ? []
      : [
          {
            id: "tache",
            title: "Tasks",
            type: "item",
            url: "/manage/taches",
            icon: icons.TaskAltOutlined,
          },
        ]),
  ],
});

const fournisseurs = {
  id: "fournisseurs",
  title: "Suppliers & Receipts",
  type: "group",
  children: [
    {
      id: "fournisseur",
      title: "Suppliers",
      type: "item",
      url: "/manage/fournisseurs",
      icon: icons.PersonOutlined,
    },
    {
      id: "facture",
      title: "Invoices",
      type: "item",
      url: "/manage/factures",
      icon: icons.ReceiptLongOutlined,
    },
  ],
};
export { rh, products, fournisseurs };

