import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./routes/publicRoutes";
import { lazy } from "react";

const AppLayout = lazy(() => import("../layouts/AppLayout"));
const Home = lazy(() => import("../pages/Home"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      ...publicRoutes,
    ],
  },
]);

export default router;
