import React from "react";
import { Link } from "react-router-dom";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

const MenubarAdmin = () => {
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
    <nav className="">
      <ul className='nav flex-column'>
        <li className='nav-item'>
        <Link to={'/admin/index'}> Dashborad</Link>
        </li>
        <li className='nav-item'>
        <Link to={'/admin/manage-admin'}> Edit User</Link>    
        </li>
        <li className='nav-item'>
        <Link to={'/admin/create-category'}> Create-Category</Link>    
        </li>
        <li className='nav-item'>
        <Link to={'/admin/create-product'}> Create-Product</Link>    
        </li>
        <li className='nav-item'>
        <Link to={'/admin/orders'}> Edit-orders</Link>    
        </li>
        
     
    
      </ul>
    </nav>
  );
};

export default MenubarAdmin;
