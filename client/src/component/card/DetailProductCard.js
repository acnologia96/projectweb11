import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Card, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import _ from "lodash";
import { addToWishList } from "../function/users";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { SplitText } from "@cyriacbr/react-split-text";
import { red } from "@mui/material/colors";
import { Helmet } from 'react-helmet-async';

const DetailProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const {
    _id,
    title,
    description,
    images,
    price,
    sold,
    quantity,
    category,
    size,
    color,
  } = product;

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
      count: 1,
    });
    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem("cart", JSON.stringify(unique));
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  };
  const handleaddWishList = (e) => {
    if (user) {
      addToWishList(user.token, _id)
        .then((res) => {
          console.log(res);
          toast.success("เพิ่มสินค้าในรายการชื่อชื่นชอบแล้ว");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("กรุณาเข้าสู่ระบบ");
    }
  };

  return (
    <Container>
      <div className="row p-5 bg-light  ">
        <div className="col-sm ">
          <Carousel autoPlay showArrows={true} infiniteLoop>
            {images &&
              images.map((item) => (
                <img
                  src={item.url}
                  key={item.public_id}
                  className="img-fluid"
                  style={{ maxWidth: 450 }}
                  alt=""
                />
              ))}
          </Carousel>
        </div>
        <div className="col-sm border-bottom border-dark  ">
          <div style={{ minHeight: 500 }} className="container  ">
            <div className="p-3">
              <h4 className=" mt-3 mb-3">
                <Helmet><title>{title}</title></Helmet>
                <strong>{title}</strong>{" "}
              </h4>
              <h6 className=" mt-2 mb-3 ">
                <strong>
                  {" "}
                  <SplitText
                    LineWrapper={({ lineIndex, children }) => (
                      <span className="wrapper">{children}</span>
                    )}
                  >
                    {description}
                  </SplitText>
                </strong>
              </h6>
              <h6 className=" mt-4 mb-5">
                <strong>ราคา : {price} บาท</strong>{" "}
              </h6>
              <hr/>
              <div className="mt-4 p2">
                <h6 className=" mt-3 mb-3 "> กรุณาเลือกไซส์ : {size}</h6>
                <div className="text-center">
                  <button
                    disabled
                    type="button"
                    class="btn btn-outline-secondary m-1 btn-lg"
                  >
                    Size S
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary m-1 btn-lg"
                  >
                    Size {size}
                  </button>
                  <button
                    disabled
                    type="button"
                    class="btn btn-outline-secondary m-1 btn-lg "
                  >
                    Size XL
                  </button>
                  <button
                    disabled
                    type="button"
                    class="btn btn-outline-secondary m-1 btn-lg"
                  >
                    Size XXL
                  </button>
                </div>
                <div
                  style={{ maxWidth: 650, maxHeight: 320 }}
                  className="mt-5 mb-5"
                >
                  <hr/>
                  <h5 className=" mt-3 mb-3">
                    <strong>รายละเอียดสินค้า</strong>{" "}
                  </h5>
                  <SplitText
                    LineWrapper={({ lineIndex, children }) => (
                      <span className="wrapper">{children}</span>
                    )}
                  >
                    {description}
                  </SplitText>
                </div>
              </div>
              <div className="grid gap-2 row-gap-3 d-flex t">
                <div
                  className="p-2 col-6 btn  border-black"
                  onClick={handleaddWishList}
                >
                  {" "}
                  <FavoriteBorderIcon className="text-dark" />
                </div>
                <div
                  className="p-2 col-6 btn bg-dark"
                  onClick={handleAddToCart}
                >
                  {" "}
                  <ShoppingCartOutlinedIcon  className="text-light"/>
                </div>
               
              </div>
               <hr/>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailProductCard;
