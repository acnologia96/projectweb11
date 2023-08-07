import React, { useEffect, useState } from "react";
import LoadingToRedirect from "./LoadingToRedirect";
import { useSelector } from "react-redux";
import { currentAdmin } from "../function/auth";

const AdminRoute = ({ children },next) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [admin, setAdmin] = useState(false);
  console.log("userRoute", children);

  useEffect(() => {
    if (user && user.token) {
        currentAdmin(user.token)
        .then(res=>{
            setAdmin(true)
            console.log(res)
        }).catch(err =>{
            setAdmin(false)
            console.log(err)

        })
    }
  }, [user]);
 


  return admin ? children : <LoadingToRedirect />;
};

export default AdminRoute;
