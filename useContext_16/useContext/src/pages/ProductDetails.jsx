import { useContext } from "react"
import { ProductDataContext } from "../context/ProductContext"
import { useParams } from "react-router-dom"


const ProductDetails = () => {
    const productData = useContext(ProductDataContext)
    const {productId} = useParams()
    const selectedProduct = productData.find((elem)=>elem.id==Number(productId))
    console.log(selectedProduct)
  
  return (
    <div>
      <div className="product-card">
          <img src={selectedProduct.image}  />
          <h3>{selectedProduct.title}</h3>
          <h5>${selectedProduct.price}</h5>
        </div>
    </div>
  )
}

export default ProductDetails