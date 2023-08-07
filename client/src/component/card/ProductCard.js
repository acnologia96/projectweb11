import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import {useDispatch } from "react-redux";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import _ from "lodash";


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { _id, title, description, images, price } = product;

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

  return (
    <div>
      
      <Card
        raised
        sx={{
          alignSelf: "center",
          Width: 350,
          padding: "0.1em",
        }}
      >

        <Typography  >
        <Button  href={"/product/" + _id}>
            <CardMedia
            component="img"
            alt="title"
            className="p-1"
            image={images && images.length ? images[0].url : ""}
          />
           </Button>
        </Typography>
       
        

        <CardContent   style={{height:160 ,marginBottom:10}} >
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
         
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>

        </CardContent>
          <Typography  p={2}  variant="body3" color="text.secondary">
            <strong>{price} บาท</strong>
          </Typography>
        <CardActions>
          <div 
          className="col-6 btn  border-black"
          >
            <VisibilityIcon className="text-dark " />
          </div>{" "}
          <div  className="m-1 col-6 btn bg-dark" onClick={handleAddToCart}>
            <ShoppingCartOutlinedIcon  className="text-light "
            />
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;