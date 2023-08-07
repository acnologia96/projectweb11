import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
const ProductTBCart = ({ item }) => {
  const dispatch = useDispatch();

  const handleChangeCount = (e) => {
    const count = e.target.value;
    console.log(e.target.value)
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === item._id) {
        cart[i].count = count;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  const handleRemove = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === item._id) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };
  const handleplus =(e)=>{
    console.log( '++1',++item.count)
  }
  const handleminus =(e)=>{
    console.log("--1",--item.count)
  }
  return (
    
      <TableBody>
        <TableRow>
          <TableCell align="center">
            <img src={item.images[0].url} alt="" width={"50"} />
          </TableCell>
          <TableCell  align="center">{item.title}</TableCell>
          <TableCell  align="center">{item.price}</TableCell>
          <TableCell  align="center">
            <div><PlusOutlined onClick={handleplus}  /> <span className="m-1">{item.count} </span> <MinusOutlined onClick={handleminus} /></div>
            
            <input
              value={item.count}
              min="0"
              max={item.quantity}
              onChange={handleChangeCount}
              
              type="number"
            />
          </TableCell>
          <TableCell  align="center">
            <button className="btn">
              <DeleteOutlined  onClick={handleRemove} className="text-danger" />
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
 
  );
};

export default ProductTBCart;
