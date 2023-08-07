import React from "react";
import { Link } from "react-router-dom";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

const MenubarUser = () => {
  const [data, setData] = React.useState({
    email: "",
    status: "initial",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: "loading" }));
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setData({ email: "", status: "sent" });
      }, 1500);
    } catch (error) {
      setData((current) => ({ ...current, status: "failure" }));
    }
  };

  return (
    <nav>
      <ul className='nav flex-column'>
      <li className='nav-item'>
        <Link to={'/user/history'}> ประวัติการซื้อ</Link>
        </li>
        <li className='nav-item'>
        <Link to={'/user/wishlist'}> สิ้นค้าที่ชื่อนชอบ</Link>
        </li>

        
     
    
      </ul>
    </nav>
  );
};

export default MenubarUser;
