import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";
import ProductCard from "../card/ProductCard";

import { listProduct, searchFilters } from "../function/product";
import { listCategory } from "../function/category";
import { Slider, Checkbox } from "antd";
import { Box } from "@mui/material";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const [category, setCategory] = useState([]);
  const [selectCate, setSelectCate] = useState([]);

  useEffect(() => {
    console.log(product);
    loadData();
    listCategory().then((res) => {
      setCategory(res.data);
    });
  }, []);
  console.log(category);

  const loadData = () => {
    setLoading(true);
    listProduct()
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  //
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilter({ query: text });
      if (!text) {
        loadData();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);
  //filter
  const fetchDataFilter = (arg) => {
    searchFilters(arg).then((res) => {
      setProduct(res.data);
      console.log(setProduct);
    });
  };

  useEffect(() => {
    fetchDataFilter({ price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...selectCate];
    const findCheck = inState.indexOf(inCheck);
    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setSelectCate(inState);
    fetchDataFilter({ category: inState });
    if (inState < 1) {
      loadData();
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h6 className="text-end">
              <b>ราคา</b>
            </h6>
            <Box
              sx={{
                py: 1,
                display: "flex",
                justifyContent: "end",
                gap: 2,
                alignItems: "end",
                flexWrap: "wrap",
              }}
            >
              <span>{price[0]}</span>{" "}
              <Slider
                style={{ width: 100 }}
                value={price}
                onChange={handlePrice}
                range
                max={10000}
              />{" "}
              <span>{price[1]}</span>
            </Box>

            <h6 className="text-end">
              <b>หมวดหมู่</b>
            </h6>
            <Box
              sx={{
                py: 1,
                display: "flex",
                justifyContent: "end",
                gap: 2,
                alignItems: "end",
                flexWrap: "wrap",
              }}
            >
              {category.map((item, index) => (
                <p>
                  <Checkbox
                    className="mb"
                    onChange={handleCheck}
                    value={item._id}
                  >
                    {item.name}
                  </Checkbox>
                </p>
              ))}
            </Box>
          </div>
          <hr />

          <div className="col">
            {loading ? (
              <>
                {" "}
                <LoadingPage />
              </>
            ) : (
              <>
                {loading ? (
                  <LoadingPage />
                ) : (
                  <>
                    {product.length < 1 ? (
                      <p>No Product found</p>
                    ) : (
                      <h2 className="text-dark text-center m-5">
                        <b>รายการสินค้า</b>
                      </h2>
                    )}
                  </>
                )}
              </>
            )}

            <div className="row pb-4">
              {product.map((item, index) => (
                <div key={index} className="col-md-3 mt-3 ">
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
