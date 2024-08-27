import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Houses from "./components/houses.tsx";
import House from "./components/house.tsx";
import Signup from "./components/signup.tsx";
import AddHouse from "./components/addHouse.tsx";
import ProtectedRoute from "./components/protectedRoute.tsx";
import ThemeSwitch from "./components/themeSwitch.tsx";
import AuthProvider from "./auth/provider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App loggedIn={false} />,
    children: [
      {
        path: "/",
        element: <Navigate to="/houses" />,
      },
      {
        path: "/houses",
        element: <Houses userHouses={false} />,
      },

      {
        path: "/houses/:id",
        element: <House />,
      },
    ],
  },
  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        element: <App loggedIn={true} />,
        children: [
          {
            path: "/app/",
            element: <Navigate to="/app/houses" />,
          },
          {
            path: "/app/houses",
            element: <Houses userHouses={false} />,
          },
          {
            path: "/app/myHouses",
            element: <Houses userHouses={true} />,
          },
          {
            path: "/app/addHouse",
            element: <AddHouse />,
          },
          {
            path: "/app/houses/:id",
            element: <House />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Signup registerType="login" />,
  },
  {
    path: "/signup",
    element: <Signup registerType="signup" />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeSwitch />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
