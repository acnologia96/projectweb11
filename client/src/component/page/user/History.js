import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getOrder } from "../../function/users";
import "../../Style/HistoryUser.css";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from "@mui/material";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrder(user.token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <h3 className="text-center pb-3 ">
        <strong>ประวัติการซื้อ</strong>
      </h3>

      {orders.map((item, index) => {
        console.log(item);
        return (
          <Box marginBottom={1} pb={3}>
            <Table component={Paper} sx={{ minWidth: 350 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    className={item.orderStatus}
                    align="center"
                    colSpan={7}
                    style={{ borderBottom: "none" }}
                  >
                    {" " + item.orderStatus}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ borderBottom: "none" }}>
                    orders.ID :{item._id}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ borderBottom: "none" }}>
                    วันที่ :{item.createdAt}
                  </TableCell>
                </TableRow>
                <TableRow style={{ background: "white" }}>
                  <TableCell>รูป</TableCell>
                  <TableCell>ชื่อ</TableCell>
                  <TableCell>รายละเอียด</TableCell>
                  <TableCell>จำนวน</TableCell>
                  <TableCell>ราคา</TableCell>
                  <TableCell>ราคารวม</TableCell>
                </TableRow>
              </TableHead>
              {item.products.map((p, i) => (
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {" "}
                      <img
                        src={p.product.images[0].url}
                        alt=""
                        height={50}
                      />{" "}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {" "}
                      {p.product.title}{" "}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {" "}
                      {p.price}{" "}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {" "}
                      {p.count}{" "}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {" "}
                      {p.price}{" "}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {" "}
                      {p.price}{" "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
              <TableRow>
                <TableCell
                  style={{ borderBottom: "none" }}
                  align="right"
                  colSpan={7}
                >
                  <strong>จำนวน : {item.products.length} รายการ</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right" colSpan={7}>
                 <strong>ราคารวม : {item.cartTotal} บาท</strong> 
                </TableCell>
              </TableRow>
            </Table>
          </Box>
        );
      })}
    </Container>
  );
};

export default History;
