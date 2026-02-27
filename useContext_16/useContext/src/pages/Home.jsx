import { use } from "react"
import { useNavigate } from "react-router-dom"


const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Home</h1>
      <button onClick={()=>{
        navigate("/products")
      }}>Explore</button>
    </div>
   
  )
}

export default Home