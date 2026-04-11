import { Navigate } from "react-router"

const ProtectedRoute = ({ children })=>{
    const token = document.cookie.includes("token")

    if(!token){
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute