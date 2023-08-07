import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenubarUser from "../../layout/MenubarUser";
import { getWishList, removeWishList } from "../../function/users";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const WishList = () => {
  const [wishlist, setWishList] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    //code
    loadData();
  }, []);
  const loadData = () => {
    getWishList(user.token).then((res) => {
      setWishList(res.data.wishlist);
    });
  };

  const handleRemove = (productId) => {
    removeWishList(user.token, productId).then((res) => {
      console.log(res.data);
      loadData();
    });
  };
  console.log(wishlist);
  return (
    <div className="container">
      <div className="row">
        <h3 className="text-center"><strong>สินค้าที่ชื่นชอบ</strong></h3>
          {wishlist.map((item, index) => (
            <div key={index} className="col-md-3 mt-4">
              <div class="card" style={{ width: 300 }}>
                <img
                  className="p-1"
                  style={{ height: "300px", objectFit: "cover" }}
                  alt="example"
                  src={
                    item.images && item.images.length ? item.images[0].url : ""
                  }
                />
                <div class="card-body">
                  <Link to={"/product/" + item._id} className=" link-underline link-underline-opacity-0 text-secondary-emphasis" > <h5 class="card-title">{item.title}</h5></Link>
              
                  <Link to={"/product/" + item._id} className=" link-underline link-underline-opacity-0 text-body-secondary card-subtitle ">{item.description}</Link>
                  <br/>
                  <Link to={"/product/" + item._id} className=" link-underline link-underline-opacity-0 text-body-secondary card-text">{item.price} บาท</Link>
                </div>
                <div className="card-body   ">
                  <div className="p-2 col-6 border-dark btn  ">
                    <ShoppingCartOutlinedIcon className="text-dark " />
                  </div>
                  <div
                    onClick={() => handleRemove(item._id)}
                    className="p-2 col-6 btn bg-dark"
                  >
                   <DeleteForeverOutlinedIcon className="text-light " />
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      

  );
};

export default WishList;
