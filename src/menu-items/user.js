// assets

import { TaskAltOutlined, WidgetsOutlined } from "@mui/icons-material";

// icons
const icons = { TaskAltOutlined, WidgetsOutlined };

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: "interactions",
  title: "Interactions",
  type: "group",
  children: [
    {
      id: "tasks",
      title: "My Tasks",
      type: "item",
      url: "/manage/taches",
      icon: icons.TaskAltOutlined,
      // target: true,
    },
  ],
};

export default pages;
