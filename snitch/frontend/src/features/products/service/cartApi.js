import axios from "axios"

const cartApiService = axios.create({
    baseURL: "http://localhost:5000/api/cart",
    withCredentials: true,
})

export async function fetchCart() {
    const res = await cartApiService.get("/")
    return res.data
}

export async function addItemToCart(productId, variantId, quantity = 1) {
    const res = await cartApiService.post("/", { productId, variantId, quantity })
    return res.data
}

export async function updateItemQuantity(productId, variantId, quantity) {
    const res = await cartApiService.patch(`/${productId}/${variantId}`, { quantity })
    return res.data
}

export async function removeItemFromCart(productId, variantId) {
    const res = await cartApiService.delete(`/${productId}/${variantId}`)
    return res.data
}

export async function clearCartApi() {
    const res = await cartApiService.delete("/")
    return res.data
}

export async function initiateCartOrder(paymentMethod = "razorpay") {
    const response = await cartApiService.post("/payment/create/order", { paymentMethod })
    return response.data
}

export async function verifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    const response = await cartApiService.post("/payment/verify/order", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    })

    return response.data

}
