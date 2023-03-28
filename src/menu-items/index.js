// project import
import { fournisseurs, products, rh } from "./admin";
import dashboard from "./dashboard";
import user from "./user";

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (u) => ({
  items: [
    dashboard,
    ...(!u.isAdmin ? [user] : []),
    ...(u.isAdmin ? [products, rh, fournisseurs] : []),
  ],
});

export default menuItems;
