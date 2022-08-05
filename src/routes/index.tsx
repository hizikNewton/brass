import { lazy } from "react";
import AppLayout from "components/shared/appLayout/AppLayout";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const NotFoundPage = lazy(() => import("../pages/404"));

const HomeRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
];

const AllPages = () => {
  const all_routes = [
    {
      element: <AppLayout />,
      children: [...HomeRoutes],
    },
    {
      path: "/",
      element: <Navigate to="/home" />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];

  return all_routes;
};

export default AllPages;
