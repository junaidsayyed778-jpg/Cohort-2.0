import { useForm } from "react-hook-form";
// Note: Ensure you are importing from 'react-router-dom' if using React Router v6
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser } from "../state/authReducer";
export const useAuth = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // 1. Add watch here
  } = useForm();

  const onLogin = async (data, setServerError) => {

    try {
        setServerError("")
      const res = await axiosInstance.post("/api/auth/login", data);
      console.log("FULL RESPONSE:", res);
      console.log("RESPONSE DATA:", res.data);

      dispatch(addUser(res.data.user));
      console.log("DISPATCHED USER:", res.data.user);
      navigate("/home");
    } catch (error) {
 
    setServerError(
      error.response?.data?.message ||
      "Something went wrong. Please try again."
    );
    }
  };

  const onRegister = async (data) => {
    try {
      const res = await axiosInstance.post("/api/auth/register", data);

      console.log("FULL RESPONSE:", res);
      console.log("RESPONSE DATA:", res.data);

      dispatch(addUser(res.data.user));

      console.log("DISPATCHED USER:", res.data.user);

      navigate("/home");
    } catch (error) {
      console.log("error in register", error);
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
