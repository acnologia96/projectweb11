import React from "react";
import Register from "./component/page/auth/Register";
import Login from "./component/page/auth/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import Home from "./component/page/home";
import HomeAdmin from "./component/page/admin/home";
import HomeUser from "./component/page/user/home";
import AdminRoute from "./component/routes/AdminRoutes";
import ManageAdmin from "./component/page/admin/ManageAdmin";
import CreateCategory from "./component/page/admin/category/CreateCategory";
import CreateProduct from "./component/page/admin/product/CreateProduct";
import UpdateProduct from "./component/page/admin/product/UpdateProduct";
import Shop from "./component/page/Shop";
import Cart from "./component/page/Cart";

import UpdateCategory from "./component/page/admin/category/UpdateCategory";
import CheckOut from "./component/page/CheckOut";
import Wishlist from "./component/page/user/Wishlist";
import History from "./component/page/user/History";
import Orders from "./component/page/admin/Orders";
import TabLogin from './component/page/auth/TapLogin'
import { currentUser } from "./component/function/auth";
import Footer from "./component/layout/Footer";
import { useDispatch } from "react-redux";
import UserRoute from "./component/routes/UserRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailProduct from "./component/page/DetailProduct";
import Page404 from "./component/page/Page404";



function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
  }
  return (
    <div className="App">
      {/*<Register />*/}
      <ToastContainer />
      <Navbar />
      
  
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/404" element={<Page404 />}></Route>
        <Route path="*" element={<Navigate to={'/404'}  />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<TabLogin />}></Route>
        <Route path="/product/:id" element={<DetailProduct />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        ></Route>

        <Route
          path="/admin/create-category"
          element={
            <UserRoute>
              <CreateCategory />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/admin/update-category/:id"
          element={
            <UserRoute>
              <UpdateCategory />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/admin/update-product/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/create-product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <UserRoute>
              <CheckOut />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/user/wishlist"
          element={
            <UserRoute>
              <Wishlist />
            </UserRoute>
          }
        ></Route>

        <Route
          path="/user/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        ></Route>

        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
