import { lazy } from "react";

// project import
import Loadable from "../components/Loadable";
import { ProtectedRoute } from "../components/ProtectedRoute";
import MainLayout from "../layout/MainLayout";
import { ManageCategories } from "../pages/manage/Categories";
import { ManageTaches } from "../pages/manage/Taches";
import { ManageUsers } from "../pages/manage/Users";

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import("../pages/dashboard")));

// render - sample page
const SamplePage = Loadable(
  lazy(() => import("../pages/extra-pages/SamplePage"))
);

// render - utilities
const Typography = Loadable(
  lazy(() => import("../pages/components-overview/Typography"))
);
const Color = Loadable(
  lazy(() => import("../pages/components-overview/Color"))
);
const Shadow = Loadable(
  lazy(() => import("../pages/components-overview/Shadow"))
);
const AntIcons = Loadable(
  lazy(() => import("../pages/components-overview/AntIcons"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "color",
      element: <Color />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "default",
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
    {
      path: "shadow",
      element: <Shadow />,
    },
    {
      path: "typography",
      element: <Typography />,
    },
    {
      path: "icons/ant",
      element: <AntIcons />,
    },
    {
      path: "/manage/taches",
      element: <ManageTaches />
    },
    {
      path: "/manage/users",
      element: <ManageUsers />
    },
    {
      path: "/manage/categories",
      element: <ManageCategories />
    }
  ],
};

export default MainRoutes;
