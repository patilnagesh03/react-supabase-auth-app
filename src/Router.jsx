// import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
// import Signup from "./components/Signup";
// import Signin from "./components/Signin";
// // import PrivateRoute from "./components/PrivateRoute";

// export const router = createBrowserRouter([
//   { path: "/", element: <App /> },
//   { path: "/signup", element: <Signup /> },
//   { path: "/signin", element: <Signin /> },
// ]);

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Layout from "./Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // <-- AuthContextProvider now lives here
    children: [
      { index: true, element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "dashboard", element: <App /> },
    ],
  },
]);
