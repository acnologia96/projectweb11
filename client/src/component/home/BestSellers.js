import React, { useState, useEffect } from "react";
import { listProductBy } from "../function/product";
import ProductCard from "../card/ProductCard";
import LoadingCard from "./LoadingCard";

const BestSellers = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    //
    loadData();
  }, []);
  const loadData = () => {
    setLoading(true);
    listProductBy("sold", "desc", 8)
      .then((res) => {
        //code
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        //code
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
  )
}

export default BestSellers
