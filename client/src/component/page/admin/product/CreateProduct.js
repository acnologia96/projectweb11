import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { toast } from "react-toastify";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { createProduct } from "../../../function/product";
import { listCategory } from "../../../function/category";
import FileUpload from "./FileUpload";
import CircularProgress from "@mui/material/CircularProgress";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import CreateCategory from "../category/CreateCategory";
import UpdateCategory from "../category/UpdateCategory";

import {
  Button,
  Container,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Helmet } from "react-helmet-async";

const initailstate = {
  title: " ",
  description: "",
  categories: [],
  category: "",
  price: "",
  quatity: "",
  images: [],
  size: "",
  gender: "",
};

const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initailstate);
  const [loading, setLoading] = useState(false);
  console.log("user", user);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        console.log(res.data);
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(values);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    const[categories]=values.categories
    console.log(categories.name);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)
      .then((res) => {
        console.log(res);
        toast.success("เพิ่ม" + res.data.title + "Success");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };

  return (
    <Box className="p-3 " sx={{ flexGrow: 5 }}>
      <Helmet><title>Admin Edit</title></Helmet>
      <Grid
        container
        justifyContent="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={5}>
          {/*-------------*/}
          <Paper className="" sx={{ height: "650px" }}>
            {" "}
            <FileUpload
              values={values}
              setValues={setValues}
              loading={loading}
              setLoading={setLoading}
            />
          </Paper>
        </Grid>
        <Grid item xs={4} sm={8} md={5}>
          <Paper sx={{ height: "650px" }}>
            <Box>
              <div
                className="text-center pt-4"
              >
                <h4>
                  <b>ข้อมูลสินค้า</b>
                </h4>
                <hr />
              </div>

              <Box p={+4} component="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <Box
                    pb={+2}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <TextField
                      style={{ width: "60%" }}
                      required={true}
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      id="outlined-basic"
                      label="ชื่อสินค้า"
                      variant="outlined"
                    />
                    <TextField
                      style={{ width: "15%" }}
                      required={true}
                      type="number"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      id="outlined-basic"
                      label="ราคา"
                      variant="outlined"
                    />
                    <TextField
                      style={{ width: "15%" }}
                      required={true}
                      type="number"
                      name="quantity"
                      value={values.quantity}
                      onChange={handleChange}
                      id="outlined-basic"
                      label="จำนวน"
                      variant="outlined"
                    />
                  </Box>
                  <Box
                    pb={+2}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <TextField
                      style={{ width: "20%" }}
                      type="text"
                      name="color"
                      value={values.color}
                      onChange={handleChange}
                      id="outlined-basic"
                      label="สี"
                      variant="outlined"
                    />

                    <Select
                      style={{ width: "20%" }}
                      defaultValue={"เพศ"}
                      name="gender"
                      onChange={handleChange}
                      id="outlined-basic"
                      label="เพศ"
                      variant="outlined"
                    >
                      <MenuItem disabled value="เพศ">
                        เพศ
                      </MenuItem>
                      <MenuItem value="Men">ผู้ชาย</MenuItem>
                      <MenuItem value="Women">ผู้หญิง</MenuItem>
                    </Select>
                    <Select
                      style={{ width: "20%" }}
                      defaultValue={"หมวดหมู่สินค้า"}
                      name="category"
                      onChange={handleChange}
                      id="outlined-basic"
                      label="หมวดหมู่สินค้า"
                      variant="outlined"
                    >
                      <MenuItem value="หมวดหมู่สินค้า" disabled selected>
                        หมวดหมู่สินค้า
                      </MenuItem>
                      {values.categories.length > 0 &&
                        values.categories.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>

                    <Select
                      style={{ width: "100px" }}
                      defaultValue={"ไซส์"}
                      required={true}
                      name="size"
                      onChange={handleChange}
                      id="outlined-basic"
                      label="ไซส์"
                      variant="outlined"
                    >
                      <MenuItem disabled value="ไซส์">
                        ไซส์
                      </MenuItem>
                      <MenuItem value="S">S</MenuItem>
                      <MenuItem value="M">M</MenuItem>
                      <MenuItem value="L">L</MenuItem>
                      <MenuItem value="XL">XL</MenuItem>
                    </Select>
                  </Box>

                  <Box pb={+2}>
                    <TextareaAutosize
                      style={{ width: "100%", height: 85 }}
                      margin="5px"
                      required={true}
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="ข้อมูลสินค้า"
                    />
                  </Box>
                  <Box pb={+3}>
                    <TextareaAutosize
                      style={{ width: "100%", height: 200 }}
                      disabled
                      type="number"
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="รายละเอียดสินค้า"
                    />
                  </Box>
                </div>
                {loading ? (
                  <h1>
                    <button className="container btn btn-primary " disabled>
                      loading......
                    </button>
                  </h1>
                ) : (
                  <h4>
                    <button className="container  btn btn-primary ">
                      submit
                    </button>
                  </h4>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateProduct;