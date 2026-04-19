import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "../features/products/pages/Dashboard";
import CreateProduct from "../features/products/pages/createProduct";
import Home from "../features/products/pages/Home";
import Layout from "./components/Layout";
import ProductDetails from "../features/products/pages/ProductDetails";
import Cart from "../features/products/pages/Cart";
import Profile from "../features/auth/pages/Profile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetails />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/seller",
        children: [
          {
            path: "/seller/create-product",
            element: (
              <ProtectedRoute role="seller">
                <CreateProduct />
              </ProtectedRoute>
            ),
          },
          {
            path: "/seller/dashboard",
            element: (
              <ProtectedRoute role="seller">
                <Dashboard />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);