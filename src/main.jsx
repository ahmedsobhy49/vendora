// // react
// import React, { lazy, Suspense } from "react";
// import ReactDOM from "react-dom/client";

// // style
// import "./index.css";
// import "./App.css";
// import "react-toastify/dist/ReactToastify.css";

// // toast
// import { ToastContainer } from "react-toastify";

// // redux
// import { Provider } from "react-redux";
// import store from "./store/index";

// // react query
// import { QueryClientProvider, QueryClient } from "react-query";

// // components
// const App = lazy(() => import("./App"));

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <QueryClientProvider client={queryClient}>
//     <Provider store={store}>
//       <App />
//     </Provider>
//     <ToastContainer />
//   </QueryClientProvider>
// );

import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// Style imports
import "./index.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// Toast
import { ToastContainer } from "react-toastify";

// Redux
import { Provider } from "react-redux";
import store from "./store/index";

// React Query
import { QueryClientProvider, QueryClient } from "react-query";

// Router and Components
import router from "./router/index.routes";
const App = lazy(() => import("./App"));

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Suspense>
    </Provider>
    <ToastContainer />
  </QueryClientProvider>
);
