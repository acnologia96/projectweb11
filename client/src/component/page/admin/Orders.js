import React, { useEffect, useState } from "react";
import MenubarAdmin from "../../layout/MenubarAdmin";
import { useSelector } from "react-redux";
import { getOrder } from "../../function/users";
import { updateStatusOrder, getOrderAdmin } from "../../function/admin";
import moment from "moment";
import { toast } from "react-toastify";
import {
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import '../../Style/HistoryUser.css'
import { Helmet } from "react-helmet-async";

const Orders = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = () => {
    getOrderAdmin(user.token).then((res) => {
      setOrders(res.data);
    });
  };
  console.log(orders);

  const handleChangeStatus = (orderId, orderstatus) => {
    updateStatusOrder(user.token, orderId, orderstatus).then((res) => {
      console.log(res.data);
      toast.info("Updated " + res.data.orderstatus + " Success");
      loadData();
    });
  };
  return (
    <div className="container ">
      <div className="col text-center">
        <h2><strong>แก้ไขออเดอร์</strong></h2>
        {orders.map((item, index) => {
          return (
            <div key={index} className="card m-3 ">
              <Helmet><title>Admin Edit</title></Helmet>
              <Table >
                <TableHead>
                  <TableRow className="bg-secondary"  key="index" >
                    <TableCell  align="center">OrderId</TableCell>
                    <TableCell style={{width:200}} align="center">Name</TableCell>
                    <TableCell style={{width:200}} align="center">วันที่</TableCell>
                    <TableCell style={{width:200}} align="center">อัพเดท</TableCell>
                    <TableCell style={{width:200}} align="center">Count</TableCell>
                    <TableCell style={{width:200}} align="center">Price</TableCell>
                    <TableCell style={{width:200}}  align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
               
                  <TableRow>
                    <TableCell align="center">{item.orderBy._id} </TableCell>
                    <TableCell align="center">
                      {item.orderBy.firstname} {item.orderBy.lastname}
                    
                    </TableCell>

                    <TableCell align="center"> {moment(item.createdAt).format("LLL")}</TableCell>
                    <TableCell align="center"> {moment(item.updatedAt).format("LLL")}</TableCell>
                    <TableCell align="center">{item.products.length}</TableCell>
                    <TableCell align="center">{item.cartTotal}</TableCell>

                    <TableCell className={item.orderStatus} align="center">
                      
                      
                      <Select 
                    
                        value={item.orderStatus}
                        onChange={(e) =>
                          handleChangeStatus(item._id, e.target.value)
                        }
                        style={{ width: "200px", alignSelf: "center",height:'50px' }}
                        className="form"
                      >
                        <MenuItem  value="Not Process">Not Process</MenuItem>
                        <MenuItem  value="Processing">Processing</MenuItem>
                        <MenuItem  value="Cancelled">Cancelled</MenuItem>
                        <MenuItem  value="Completed">Completed</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
            
                <tr key="">
                  <td className="text-left" colSpan={3}>
                    ราคา : <b>{item.cartTotal}</b>{" "}
                  </td>
                </tr>
              </Table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
