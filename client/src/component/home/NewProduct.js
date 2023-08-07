import React, { useState, useEffect } from "react";
import { listProductBy } from "../function/product";
import ProductCard from "../card/ProductCard";
import LoadingCard from "./LoadingCard";

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProductBy("createdAt", "desc", 8)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
    
      <div className="container" >
       {loading ?(
        <LoadingCard count={5} />
       ):(
       <div className="row">
          {products.map((item, index) => 
            <div key={index} className="col-md-3 mt-4">
              <ProductCard product={item} />
            </div>
          )}
        </div>
       )}
        
      </div>
    </>
  );
};

export default NewProduct;
