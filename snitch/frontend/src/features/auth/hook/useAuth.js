import { useDispatch } from "react-redux"
import { register, login, getMe } from "../service/authApi"
import { setLoading, setUser } from "../state/authSlice"

export const useAuth = () => {
    const dispatch = useDispatch()

    async function handleRegister({ email, contact, password, fullname, isSeller = false }) {
        const data = await register({ email, contact, password, fullname, isSeller })

        dispatch(setUser(data.user))
    }

    async function handleLogin({ email, password }) {
        const data = await login({ email, password })

        dispatch(setUser(data.user))
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
            dispatch(setLoading(false))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setLoading(false))

        }
    }
    return { handleRegister, handleLogin, handleGetMe }
}