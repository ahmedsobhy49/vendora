// import { RouterProvider } from "react-router-dom";
// import router from "./router/index.routes";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// export default function App() {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const handleStorageChange = (event) => {
//       if (event.key === "token" && !event.newValue) {
//         // If the token is removed from localStorage, log out the user
//         // For example, navigate to the login page or reset state
//         navigate("/login");
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     <div>
//       <RouterProvider router={router}></RouterProvider>
//     </div>
//   );
// }

import { RouterProvider } from "react-router-dom";
import router from "./router/index.routes";
import { useEffect } from "react";
import DashboardContainer from "./common/DashboardContainer";

export default function App() {
  useEffect(() => {
    const checkToken = () => {
      if (!localStorage.getItem("token")) {
        window.location.reload(); // Reload if token is missing
      }
    };

    // Listen for `storage` events across tabs/windows
    const handleStorageChange = (event) => {
      if (event.key === "token" && event.newValue === null) {
        checkToken();
      }
    };

    // Trigger token check when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkToken();
      }
    };

    // Initial token check in case the token was already removed before loading
    checkToken();

    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
