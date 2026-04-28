import { useState, useEffect } from "react"
import { fetchUserOrders, removeOrderFromHistory } from "../service/cartApi"
import { useSelector } from "react-redux"

export const useOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const user = useSelector(s => s.auth.user)

    const handleFetchOrders = async () => {
        if (!user) return
        try {
            setLoading(true)
            const data = await fetchUserOrders()
            if (data.success) {
                setOrders(data.orders)
            }
        } catch (err) {
            setError(err.reason || "Failed to fetch orders")
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveOrder = async (orderId) => {
        try {
            const data = await removeOrderFromHistory(orderId)
            if (data.success) {
                setOrders(prev => prev.filter(o => o._id !== orderId))
            }
        } catch (err) {
            alert("Failed to remove order from history")
        }
    }

    useEffect(() => {
        handleFetchOrders()
    }, [user])

    return {
        orders,
        loading,
        error,
        handleFetchOrders,
        handleRemoveOrder
    }
}
