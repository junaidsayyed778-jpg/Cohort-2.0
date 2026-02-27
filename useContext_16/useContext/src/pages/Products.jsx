import { useContext } from "react"
import { ProductDataContext } from "../context/ProductContext"
import { Link } from "react-router-dom"

 
const Products = () => {
  const productData = useContext(ProductDataContext);

  if (!productData || productData.length === 0) {
    return <h2 style={{ color: "#aaa", padding: "40px" }}>Loading products...</h2>;
  }

  return (
    <div className="app">
      <h1 className="title">🔥 Featured Products</h1>

      <div className="product-grid">
        {productData.map((elem) => (
          <Link
            key={elem.id}
            to={`/products/${elem.id}`}
            className="product-link"
          >
            <div className="product-card">
              <img src={elem.image} alt={elem.title} />
              <h3>{elem.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default Products