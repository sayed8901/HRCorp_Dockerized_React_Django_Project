import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes.jsx";

import UserProvider from "./contextProviders/Contexts.jsx";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import ThemeContextProvider from "./contextProviders/ThemeContextProvider.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer></ToastContainer>
      </UserProvider>
    </ThemeContextProvider>
  </StrictMode>
);
