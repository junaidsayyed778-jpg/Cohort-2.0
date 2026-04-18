import { useDispatch } from "react-redux"
import {getSellerProduct, createProduct} from "../service/productApi"
import { setSellerProducts } from "../state/productSlice"

export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formData){
        const data = await createProduct(formData)

        return data.product
    }

    async function handleGetSellerProduct(){
        const data = await getSellerProduct()

        dispatch(setSellerProducts(data.product))
        return data.product
    }

    return{
        handleCreateProduct,
        handleGetSellerProduct
    }
}