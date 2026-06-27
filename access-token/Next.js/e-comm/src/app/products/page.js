import ProductCard from "@/components/ProductCard";
import React from "react";

const page = async () => {
  let res = await fetch("https://fakestoreapi.com/products")
  let products = await res.json()
  return (
    <div className="grid grid-cols-4 gap-5 hover:not-last:not-first-of-type:">
      {products.map((elem) => {
        return <ProductCard key={elem.id} product={elem}/>;
      })}
    </div>
  );
};

export default page;
