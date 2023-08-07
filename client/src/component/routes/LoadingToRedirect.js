import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingPage from '../page/LoadingPage'

const LoadingToRedirect = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
   
    count === 0 && navigate("/");

     return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <>
     
     {user && (
                  <>
                    {
                      user.role === "admin" ? (
                        <>
                        <LoadingPage />
                        
                        </>
                      ) : (
                        <>
                                <h1>กำลังเปลี่ยนเส้นาทาง..... {count}</h1>
                        </>
                      )
                    }
                  </>
                )}



    </>
  );
};

export default LoadingToRedirect;
