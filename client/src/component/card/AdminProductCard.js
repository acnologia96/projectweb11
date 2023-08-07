import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const AdminProductCard = ({ product,handleRemove }) => {
  console.log(product);
  const { _id,title, description, images,price } = product;
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
          <Button  href={"/admin/update-product/" + _id} className="border" style={{ width: "100%" }}><EditIcon  color="success"/></Button>
          <Button className="border" style={{ width: "100%" }}  onClick={() => handleRemove(_id)}><DeleteForeverIcon 
          className="text-danger"
        />,</Button>
        </CardActions>
    </Card>
  </div>
  );
};

export default AdminProductCard;
