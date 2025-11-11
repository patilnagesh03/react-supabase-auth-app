import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
// import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  { path: "/dashboard", element: <App /> },
  { path: "/signup", element: <Signup /> },
  { path: "/", element: <Signin /> },
]);
