import React, { useEffect, useState } from "react";
import { Badge } from "antd";
import Menu from "@mui/material/Menu";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";


// Router
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Search from "../card/Search";
import "../Style/Navbar.css";
import { IconButton, MenuItem,  } from "@mui/material";
import { listCategory } from "../function/category";



const Navbarpage = () => {
  const [category, setCategory] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));

  console.log("user Navbar", user);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };
  useEffect(() => {
  
  
    listCategory().then((res) => {
      setCategory(res.data);
     
    });
  }, []);
  console.log(category);
  const handleClick = () => {
    console.log();
  };
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="shadow p-3 mb-5 bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
              alt=""
              width={70}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/"  >หน้าแรก</Nav.Link>
              <Nav.Link href="/shop">ร้านค้า</Nav.Link>
        
              <Nav.Link disabled href="#UnSuccess" id="64a6c7ed7f1f4adc474e5424" onClick={handleClick}>
                เสื้อ
              </Nav.Link>
              <Nav.Link disabled href="#UnSuccess" id="64a6c7f37f1f4adc474e5429" onClick={handleClick}>
                กางเกง
              </Nav.Link>
              <Nav.Link disabled href="#UnSuccess" id="64a6c7bb7f1f4adc474e5409" onClick={handleClick}>
                หมวก
              </Nav.Link>
              <Nav.Link disabled href="#UnSuccess" id="64a6c7f77f1f4adc474e542e" onClick={handleClick}>
                รองเท้า
              </Nav.Link>
            </Nav>

            <Nav>
            <Navbar>
            <Search />
            </Navbar>
            
            <Navbar>
              {
                user ? (
                  <>
                    <Nav.Link href="/cart">
                      {" "}
                      {cart.length === 0 ? (
                        <ShoppingCartOutlinedIcon
                          style={{ fontSize: "25px" }}
                        />
                      ) : (
                        <Badge
                          size="large"
                          count={cart.length}
                          offset={[9, 0]}
                          showZero
                        >
                          <ShoppingCartOutlinedIcon
                            style={{ fontSize: "25px" }}
                          />
                        </Badge>
                      )}
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/login">
                      {" "}
                      {cart.length === 0 ? (
                        <ShoppingCartOutlinedIcon
                          style={{ fontSize: "25px" }}
                        />
                      ) : (
                        <Badge
                          size="large"
                          count={cart.length}
                          offset={[9, 0]}
                          showZero
                        >
                          <ShoppingCartOutlinedIcon
                            style={{ fontSize: "25px" }}
                          />
                        </Badge>
                      )}
                    </Nav.Link>
                  </>
                ) //false
              }
              </Navbar>
              
              <Nav.Link>
                {user && (
                  <>
                    {
                      user.role === "admin" ? (
                        <>
                          <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                          >
                            <AccountCircle />
                          </IconButton>

                          <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem disabled component={Link} to="#">
                              บัญชีของฉัน
                            </MenuItem>
                            <MenuItem component={Link} to="/admin/index">
                              แก้ไขสินค้า
                            </MenuItem>
                            <MenuItem component={Link} to="/admin/manage-admin">
                              แก้ไขสมาชิก
                            </MenuItem>
                            <MenuItem
                              component={Link}
                              to="/admin/create-product"
                            >
                              เพิ่มสินค้า
                            </MenuItem>
                            <MenuItem
                              component={Link}
                              to="/admin/create-category"
                            >
                              เพิ่มหมวดหมู่สินค้า
                            </MenuItem>
                            <MenuItem component={Link} to="/admin/orders">
                              แก้ไขออเดอร์
                            </MenuItem>
                            <MenuItem onClick={logout}>ออกจากระบบ</MenuItem>
                          </Menu>
                        </>
                      ) : (
                        <>
                          <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                          >
                            <AccountCircle />
                          </IconButton>

                          <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem disabled={true}>{user.username}</MenuItem>
                            <MenuItem component={Link} to="/user/index">
                              บัญชีของฉัน
                            </MenuItem>
                            <MenuItem component={Link} to="/user/history">
                              ประวัติการซื้อ
                            </MenuItem>
                            <MenuItem
                              component={Link}
                              to="http://localhost:3000/user/wishlist"
                            >
                              สินค้าที่ชื่นชอบ
                            </MenuItem>
                            <MenuItem onClick={logout}>ออกจากระบบ</MenuItem>
                          </Menu>
                        </>
                      ) //false
                    }
                  </>
                )}
              </Nav.Link>
              <Navbar>
                {!user && (
                  <>
                    <Nav.Link href="/login">
                      <LockOpenOutlinedIcon style={{ fontSize: "25px" }} />
                    </Nav.Link>
                  </>
                )}
              </Navbar>
                
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbarpage;
