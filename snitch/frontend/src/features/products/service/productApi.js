import axios from "axios"

const productApiService = axios.create({
    baseURL: "/api/products",
    withCredentials: true,
})

export async function createProduct(formData){
    const response = await productApiService.post("/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })

    return response.data
}

export async function getSellerProduct(){
    const response = await productApiService.get("/seller")

    return response.data
}

export async function getAllProducts(){
    const response = await productApiService.get("/")
    return response.data
}