import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getData } from "../../api/ProductApi";

export const ProductDataContext = createContext()
const ProductContext = (props) => {
      const [productData, setProductData] = useState([]);

const setData =async() =>{
  const data =await getData()
  console.log(data)
  setProductData(data)
}

  useEffect(() => {
    setData();
  }, []);
  return (
    <ProductDataContext.Provider value={productData}>
        {props.children}
    </ProductDataContext.Provider>
  )
}

export default ProductContext