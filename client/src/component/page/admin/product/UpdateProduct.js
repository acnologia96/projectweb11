import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//function
import { updateProduct, readProduct } from "../../../function/product";
import { listCategory } from "../../../function/category";
import FileUpload from "../product/FileUpload";
import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";

const initailstate = {
  title: " ",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
  size: "",
  gender: "",
};

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initailstate);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    listCategory(user.token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(e.target.value);
    updateProduct(user.token, values._id, values)
      .then((res) => {
        toast.success("Update" + res.data.title + "succes");
        setLoading(false);
        navigate("/admin/index");
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  console.log("product", values);
  console.log("cate", category);
  return (
    <Box className="p-3 " sx={{ flexGrow: 5 }}>
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
              <div className="text-center pt-4">
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
                  style={{height:'73px' }}
                    pb={+2}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <TextField
                      style={{ width: "20%",height:'5px'  }}
                      type="text"
                      name="color"
                      value={values.color}
                      onChange={handleChange}
                      id="outlined-basic"
                      label="สี"
                      variant="outlined"
                    />

                    <Select
                      style={{ width: "20%"}}
                      value={values.gender}
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
                      value={values.category._id}
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
                      {category.length > 0 &&
                        category.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
          

                    <Select
                      style={{ width: "100px" }}
                      value={values.size}
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

export default UpdateProduct;
