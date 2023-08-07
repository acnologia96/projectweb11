import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userCart } from "../function/users";
import ProductTBCart from "../card/ProductTBCart";
import { Box, Button, Table, TableCell, TableHead, TableRow } from "@mui/material";


const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));
  const getTotal = () => {
    return cart.reduce((currenValue, nextValue) => {
      return currenValue + nextValue.count * nextValue.price;
    }, 0);
  };
  console.log(cart);
  const handleSaveOrder = () => {
    alert("checkout order");
    userCart(user.token, cart)
      .then((res) => {
        console.log(res);
        navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showCartItem = () => (
    <Table className="table text-center">
      <TableHead className="thead-light">
        <TableRow>
          <TableCell align="center">Image</TableCell>
          <TableCell align="center">Title</TableCell>
          <TableCell align="center">Price</TableCell>
          <TableCell align="center">Count</TableCell>
          <TableCell align="center">Remove</TableCell>
        </TableRow>
      </TableHead>
      {cart.map((item) => (
        <ProductTBCart  key={item._id} item={item} />
      ))}
    </Table>
  );

  return (
    <div className="container bg-body  pb-5">
      <h2 className="text-center p-5">
        <strong>ตะกร้าสินค้า</strong> 
      </h2>
      <div className="row">
        <TableCell className="col-md-8 border">
          {!cart.length ? <p>No Product In Cart</p> : showCartItem()}
        </TableCell>

        <TableCell className="col-md-4 border">
          <h3>สรุปข้อมูลการสั่งซื้อ</h3>
          <hr />
          <p className="text-center">สิ้นค้า {cart.length} รายการ (X) ชิ้น</p>
          <hr />
          {cart.map((item, index) => (
            <div class="row p-1">
              <div class="col">
                <p key={index}>
                  {item.title}
                </p>
              </div>
              <div class="col text-end">{item.count} ชิ้น</div>
            </div>
          ))}
          <hr />
         <p className="text-end"> ราคารวมทั้งสิ้น : {getTotal()}</p> 
          <hr />
          <Box display={"flex"} justifyContent={"center"}>
          {user ? (
            <Button
            variant="contained"  color='inherit'
              disabled={!cart.length}
              onClick={handleSaveOrder}
            >
              Check Out
            </Button>
          ) : (
            <Button href="/login" variant="outlined " color="error"  >
                Check Out
            </Button>
          )}
          </Box>
         
        </TableCell>
      </div>
    </div>
  );
};

export default Cart;
