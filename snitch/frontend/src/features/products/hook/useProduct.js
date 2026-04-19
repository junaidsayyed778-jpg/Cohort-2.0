import { useDispatch } from "react-redux"
import {getSellerProduct, createProduct, getAllProducts, getProductDetails} from "../service/productApi"
import { setSellerProducts, setProducts } from "../state/productSlice"

export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formData){
        const data = await createProduct(formData)

        return data.product
    }

    async function handleGetSellerProduct(){
        const data = await getSellerProduct()

        dispatch(setSellerProducts(data.products))
        return data.products
    }

    async function handleGetAllProducts(search){
        const data = await getAllProducts(search)
        dispatch(setProducts(data.products))
        return data.products
    }

    async function handleProductsById(productId){
        const data = await getProductDetails(productId)
        return data.product
    }
    return{
        handleCreateProduct,
        handleGetSellerProduct,
        handleGetAllProducts,
        handleProductsById
    }
}