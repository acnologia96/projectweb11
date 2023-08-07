import React, { useEffect, useState } from "react";

import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Box from "@mui/joy/Box";
import {
  createCategory,
  listCategory,
  deleteCategory,
} from "../../../function/category";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Helmet } from "react-helmet-async";

const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log("token", user.token);

  const [values, setValues] = useState({
    name: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(category);

  const handleChangeCate = (e) => {
    console.log(values.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(user.token, values)
      .then((res) => {
        console.log(res);
        loadData(user.token);
        toast.success("เพิ่ม " +  res.data.name +  " Success!!!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error!!! Insert Data");
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are You Sure Remove User")) {
      deleteCategory(user.token, id)
        .then((res) => {
          console.log(res);
          toast.success("ลบ" + res.data.name + "สำเร็จ");
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <Box mb={2} pt={3} bgcolor={"white"} borderRadius={15}>
        <Helmet>
          <title>Admin Edit</title>
        </Helmet>
        <h2 className="text-center ">เพิ่มหมวดหมู่สินค้า</h2>
        <form onSubmit={handleSubmit}>
          <Box
            mt={2}
            justifyItems={"center"}
            display={"flex"}
            justifyContent={"center"}
          >
            <TextField
              name="name"
              value={values.name}
              onChange={handleChangeCate}
              required
            />
          </Box>
          <Box mt={2} pb={2} display={"flex"} justifyContent={"center"}>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Box>
        </form>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440, padding: 2 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <h5>
                    <strong>หมวดหมู่</strong>
                  </h5>
                </TableCell>
                <TableCell align="right">
                  <h5>
                    <strong>แก้ไข</strong>
                  </h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.map((item) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {" "}
                    {item.name}{" "}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/admin/update-category/${item._id}`}>
                      <EditIcon color="success" />
                    </Link>

                    <ClearIcon
                      color="error"
                      onClick={() => handleRemove(item._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default CreateCategory;
