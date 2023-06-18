import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TodosPage from "./pages/TodosPage";
import Login from "./pages/Login";
import AuthLayout from "./layouts/AuthLayout";
import NotFoundPage from "./pages/NotFoundPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <TodosPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
