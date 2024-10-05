import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import router from "./router/index.routes";

export default function App() {
  const dispatch = useDispatch();

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
