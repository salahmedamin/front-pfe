// project import
import { fournisseurs, products, rh } from "./admin";
import dashboard from "./dashboard";
import user from "./user";

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (u) => ({
  items: [
    dashboard,
    ...(!u.isAdmin ? [user, products, rh(u)] : []),
    ...(u.isAdmin ? [products, rh(u), fournisseurs] : []),
  ],
});

export default menuItems;
