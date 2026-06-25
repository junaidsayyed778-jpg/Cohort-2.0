import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";

export const useAuth = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onLogin = (data) => {
        console.log(data)
    }

    const onRegister = (data) => {
        console.log(data)
    }

    return {
        register,
        handleSubmit,
        errors,
        navigate,
        onLogin,
        onRegister
    }
}