import React, { useState, useEffect } from "react";
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import axios from "axios";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

const App = () => {


  return (
  <div>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:productId" element={<ProductDetails />}></Route>
    </Routes>
  </div>
);
};

export default App;
