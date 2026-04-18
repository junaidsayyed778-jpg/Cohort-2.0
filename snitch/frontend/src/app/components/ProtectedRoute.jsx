import { useSelector } from "react-redux"
import { Navigate } from "react-router"

const ProtectedRoute = ({ children, role="buyer" })=>{
    const token = document.cookie.includes("token")
    const user = useSelector(state=> state.auth.user)
    const loading = useSelector(state=> state.auth.loading)

    if(loading){
        return <div>Loading...</div>
    }

    if(!token){
        return <Navigate to="/login" replace />
    }

    if(user.role !== role){
        return <Navigate to="/" replace />  
    }
    return children
}

export default ProtectedRoute