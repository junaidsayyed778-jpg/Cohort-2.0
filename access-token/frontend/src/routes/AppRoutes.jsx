import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/mainLayout";
import Home from "../pages/Home";
import Public from "./protected/Public";
import Protected from "./protected/Protected";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser, removeUser, setLoading } from "../state/authReducer";

const AppRoutes = () => {
   
   const dispatch = useDispatch()

useEffect(() => {
  (async () => {
    dispatch(setLoading(true));

    try {
      const res = await axiosInstance.get("/api/auth/me");

      dispatch(addUser(res.data.user));
    } catch (error) {

      dispatch(removeUser())
      console.log(error);
      dispatch(addUser(null));
    }
  })();
}, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Public />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <Protected />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
