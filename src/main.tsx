import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Houses from "./components/houses.tsx";
import House from "./components/house.tsx";
import Signup from "./components/signup/signup.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/houses",
        element: <Houses />,
      },
      {
        path: "/houses/:id",
        element: <House />,
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
    <RouterProvider router={router} />
  </StrictMode>
);
