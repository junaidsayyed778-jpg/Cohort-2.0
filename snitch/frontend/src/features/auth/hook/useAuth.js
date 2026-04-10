import { useDispatch } from "react-redux"
import { register } from "../service/authApi"
import { setUser } from "../state/authSlice"

export const useAuth = () => {
    const dispatch = useDispatch()

    async function handleRegister({ email, contact, password, fullname, isSeller = false}){
        const data = await register({ email, contact, password, fullname, isSeller})

        dispatch(setUser(data.user))
    }

    return {handleRegister}
}