// import React, { createContext, useContext, useState, useCallback } from "react";
// import Snackbar from "../components/Snackbar";

// const SnackbarContext = createContext();

// export function SnackbarProvider({ children }) {
//   const [snackbar, setSnackbar] = useState({
//     message: "",
//     type: "info",
//     show: false,
//   });

//   const showSnackbar = useCallback((message, type = "info") => {
//     setSnackbar({ message, type, show: true });
//     setTimeout(() => {
//       setSnackbar((prev) => ({ ...prev, show: false }));
//     }, 3000);
//   }, []);

//   return (
//     <SnackbarContext.Provider value={{ showSnackbar }}>
//       {children}
//       <Snackbar
//         message={snackbar.message}
//         type={snackbar.type}
//         show={snackbar.show}
//       />
//     </SnackbarContext.Provider>
//   );
// }

// export function useSnackbar() {
//   return useContext(SnackbarContext);
// }
