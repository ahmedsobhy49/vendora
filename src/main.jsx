// react
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

// style
import "./index.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// toast
import { ToastContainer } from "react-toastify";

// redux
import { Provider } from "react-redux";
import store from "./store/index";

// react query
import { QueryClientProvider, QueryClient } from "react-query";

// components
const App = lazy(() => import("./App"));

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Suspense fallback={<div>Loading</div>}>
        <App />
      </Suspense>
    </Provider>
    <ToastContainer />
  </QueryClientProvider>
);
