import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login"
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

export const routes = createBrowserRouter([
  {
    path: "/",
 element:(
  <ProtectedRoute >
    <Dashboard />
  </ProtectedRoute>
 )  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />
  }
]);