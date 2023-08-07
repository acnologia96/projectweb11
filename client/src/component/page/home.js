import React from "react";
import NewProduct from "../home/NewProduct";
import BestSellers from "../home/BestSellers";

import banner from "../../images/DEoWE0xWAAA0BK7.jpg";
import bestsell from "../../images/bestsell.jpg";


import PaginationPage from "../layout/Pagination";

//
//
const Home = () => {
  return (
    <div className="container">
      {/*ใหม่ */}
      <img src={banner} alt="" className="shadow img-fluid mx-auto d-block"  />
      <h4 className=" text-center p-3 mt-5">New Product</h4>
      <hr />
      <NewProduct />
      
     
      

      {/*ขายดี */}
      <img src={bestsell} alt="" className="shadow img-fluid mx-auto d-block mt-5" />
      <h4 className="text-center p-3 mt-5">Best Sellers</h4>
      <hr />
      <BestSellers />
      
      
      
      
    </div>
  );
};

export default Home;
