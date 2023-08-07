import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getuserCart,
  saveAddress,
  saveOrder,
  ClearCart,
} from "../function/users";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { Box, Button, TableCell } from "@mui/material";


const CheckOut = () => {

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [values, setValues] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  //const [address, setAddress] = useState([]);
  const [addressSaved, setAddressSave] = useState(false);
 
  console.log(user);

  useEffect(() => {
    getuserCart(user.token).then((res) => {
      console.log(res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);
  
  

const handleChange=(e)=>{
 // console.log(e.target.name,e.target.value)
  setValues({...values,[e.target.name]:e.target.value})
  console.log(values)
}


  const hadleSaveAddress = (e) => {
     
   saveAddress(user.token, values)
   .then(res=>{
    console.log(values)
    toast.success("save");
    setAddressSave(true);
   }).catch(err=>{
    console.log(err)
   })

  };


  const handleCreateOrder = () => {
    saveOrder(user.token)
      .then((res) => {
        console.log(res.data);
        ClearCart(user.token);
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // local localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart");
        }

        toast.success("save order succes");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div class="container bg-body">
      <div class="row">
        <div class="col m-3">
          <h4 className="text-center mt-2">ที่อยู่</h4>
          <div className="form-group">
            <Box p={+4} component="form"  value={values} onSubmit={hadleSaveAddress} className="border-end">
              <div className="form-group">
                <Box pb={+2} className="d-flex justify-content-start gap-2 ">
                  <TextField
                   type="text"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    id="outlined-basic"
                    label="ชื่อ"
                    variant="outlined"
                  />

                  <TextField
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    id="outlined-basic"
                    label="นามสกุล"
                    variant="outlined"
                  />
                  <TextField
                  value={values.tel}
                  onChange={handleChange}
                    name="tel"
                    id="outlined-basic"
                    label="เบอร์ติดต่อ"
                    variant="outlined"
                  />
                </Box>
                <Box pb={+2} className="d-flex justify-content-start gap-2  ">
                  <TextField
                  value={values.houseNo}
                   onChange={handleChange}
                    name="houseNo"
                    style={{ maxWidth: "50%" }}
                    id="outlined-basic"
                    label="บ้านเลขที่"
                    variant="outlined"
                  />
                  <TextField
                  value={values.villageNo}
                   onChange={handleChange}
                    name="villageNo"
                    style={{ maxWidth: "10%" }}
                    id="outlined-basic"
                    label="หมู่"
                    variant="outlined"
                  />
                  <TextField
                  value={values.subDistrict}
                   onChange={handleChange}
                    name="subDistrict"
                    style={{ maxWidth: "40%" }}
                    id="outlined-basic"
                    label="ตำบล"
                    variant="outlined"
                  />
                </Box>
                <Box className="d-flex justify-content-start mt-2 gap-2  ">
                  <TextField
                  value={values.subArea}
                    name="subArea"
                    // value={fitstname}
                    onChange={handleChange}
                    id="outlined-basic"
                    label="อำเภอ"
                    variant="outlined"
                  />
                  <TextField
                  value={values.area}
                   onChange={handleChange}
                    name="area"
                    style={{ maxWidth: "50%" }}
                    id="outlined-basic"
                    label="จังหวัด"
                    variant="outlined"
                  />
                  <TextField
                   value={values.postalCode}
                   onChange={handleChange}
                    name="postalCode"
                    style={{ maxWidth: "20%" }}
                    id="outlined-basic"
                    label="รหัสไปรษณีย์"
                    variant="outlined"
                  />
                </Box>
              </div>
            <Box className="d-flex justify-content-center mt-5 ">
               <Button 
                variant="outlined"
                color="inherit"
                onClick={hadleSaveAddress}
              >
                บันทึก
              </Button>
            </Box>
             
            </Box>
          </div>

          <br />
         
        </div>

        <TableCell className="col-md-4 ">
        <h3>สรุปข้อมูลการสั่งซื้อ</h3>
          <hr />
          <p className="text-center"> สิ้นค้า {products.length} รายการ (X) ชิ้น</p>
          <hr />
          {products.map((item, index) => (
            <div class="row p-1">
              <div class="col">
                <p key={index}>
                {item.product.title} 
                </p>
              </div>
              <div class="col text-end">{item.count} ชิ้น</div>
            </div>
          ))}
          <hr />
          <p className="text-end"> ราคารวมทั้งสิ้น :{total}</p> 
          <hr />
          <Box display={"flex"} justifyContent={"center"}>
          <Button
           variant="outlined"  color='inherit'
            onClick={handleCreateOrder}
            disabled={!addressSaved || !products.length}
          >
            CheckOut
          </Button>

          </Box>

          
          <br />
        </TableCell>
      </div>
    </div>
  );
};

export default CheckOut;
