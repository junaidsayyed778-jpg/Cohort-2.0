import { useForm } from "react-hook-form";
// Note: Ensure you are importing from 'react-router-dom' if using React Router v6
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
export const useAuth = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // 1. Add watch here
  } = useForm();

const onLogin = async (data) => {
  console.log("Login payload:", data);

  try {
    const res = await axiosInstance.post("/api/auth/login", data);
    console.log("res from login:", res);
  } catch (error) {
    console.log("error in login", error);
  }
};

  const onRegister = async (data) => {
  try {
      const res = await axiosInstance.post("/api/auth/register", data);
      console.log("res from login: ", res)
    } catch (error) {
      console.log("error in login", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    navigate,
    onLogin,
    onRegister,
    watch, // 2. Return watch
  };
};
