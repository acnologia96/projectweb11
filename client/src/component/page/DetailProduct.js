import React, { useState, useEffect } from "react";
import { readProduct } from "../function/product";
import { useParams } from "react-router-dom";
import DetailProductCard from "../card/DetailProductCard";

const DetailProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <DetailProductCard product={product} />
      </div>
      <div className="row"></div>

    </div>
  );
};

export default DetailProduct;
