import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "../features/products/pages/Dashboard";
import CreateProduct from "../features/products/pages/CreateProduct";
import Home from "../features/products/pages/Home";
import Layout from "./components/Layout";
import ProductDetails from "../features/products/pages/ProductDetails";
import Cart from "../features/products/pages/Cart";
import Profile from "../features/auth/pages/Profile";
import SellerProductDetails from "../features/products/pages/SellerProductDetails";
import UpdateVariant from "../features/products/pages/UpdateVariant";
import OrderSuccess from "../features/products/pages/OrderSuccess";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "product/:productId",
        element: <ProductDetails />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "order-success",
        element: <OrderSuccess />
      },
      {
        path: "seller",
        children: [
          {
            path: "create-product",
            element: (
              <ProtectedRoute role="seller">
                <CreateProduct />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard",
            element: (
              <ProtectedRoute role="seller">
                <Dashboard />
              </ProtectedRoute>
            ),
          },

          {
            path: "product/:productId",
            element:(
              <ProtectedRoute role="seller">
                <SellerProductDetails />
              </ProtectedRoute>
            )
          },
          {
            path: "product/:productId/variant/:variantId",
            element:(
              <ProtectedRoute role="seller">
                <UpdateVariant />
              </ProtectedRoute>
            )
          }

        ],
      },
    ],
  },
]);