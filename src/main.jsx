import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import { AppAuthProvide } from "./context/AppAuth";
import { AppProvider } from "./context/AppProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppAuthProvide>
      <AppProvider>
        <RouterProvider router={App} />
      </AppProvider>
    </AppAuthProvide>
  </React.StrictMode>
);
