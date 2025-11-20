import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";

export default function Layout() {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
}
