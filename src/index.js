import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { router } from "./Router";
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
// import { SnackbarProvider } from "./Context/SnackbarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <SnackbarProvider>
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
  // </SnackbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
