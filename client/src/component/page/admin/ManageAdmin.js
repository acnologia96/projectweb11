import React, { useEffect, useState } from "react";

import {
  listUser,
  changeStatus,
  changeRole,
  removeUser,
  resetPassword,
} from "../../function/users";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
  Pagination,
  Box,
  Container,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";

const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  const [filterRole, setFilterRole] = useState([]);
  console.log("data", data);

  //css
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadData(user.token);
  }, [user.token]);
  const loadData = (authtoken) => {
    listUser(authtoken)
      .then((res) => {
        setData(res.data);
        setFilter(res.data);
        // [...new Set[]]
        const loopfilterRole = [...new Set(res.data.map((item) => item.role))];
        setFilterRole(loopfilterRole);
      })
      .catch((err) => {
        console.log(err.res.data);
      });
  };

  const handleonchange = (e, id) => {
    const value = {
      id: id,
      enabled: e.target.checked,
    };
    changeStatus(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.res);
      });
  };

  const handleChangeRole = (e, id) => {
    const value = {
      id: id,
      role: e.target.value,
    };
    console.log(value);
    changeRole(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.res);
      });
  };
  const handleRemove = (id) => {
    if (window.confirm("Are You Sure Remove User")) {
      removeUser(user.token, id)
        .then((res) => {
          console.log(res);
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err.res);
        });
    }
  };
  const handlefilter = (e) => {
    const value = e.target.value;

    if (value === "all") {
      setFilter(data);
      console.log(data);
    } else {
      const filterData = data.filter((item, index) => {
        return item.role === value;
      });
      setFilter(filterData);
    }
  };
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const roleData = ["admin", "user"];
  return (
    <Container class="d-flex justify-content-center" >
      <Box  className="container    ">
        <h4 className="text-center">แก้ไขข้อมูล User</h4>
        <hr/>

        <div className="d-flex justify-content-between pb-3">
          <SearchIcon />
          <Select
            onChange={(e) => handlefilter(e)}
            sx={{ m: 1, height: "30px" }}
            defaultValue={"all"}
          >
            <MenuItem value="all">All</MenuItem>
            {filterRole.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>

        <TableContainer className="mb-5" component={Paper}>
          <Table s={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Name/lastname</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Created</TableCell>
                <TableCell align="center">Updated</TableCell>
                <TableCell align="center">Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filter.map((item, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell> {item.username} </TableCell>
                  <TableCell align="center">
                    {" "}
                    {item.firstname} {item.lastname}{" "}
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <Select
                        onChange={(e) => handleChangeRole(e, item._id)}
                        style={{ width: "100%" }}
                        value={item.role}
                      >
                        {roleData.map((item, index) => (
                          <MenuItem value={item} key={index}>
                            <Stack direction="row" spacing={1}>
                              {item === "admin" ? (
                                <Chip label={item} color="success" />
                              ) : (
                                <Chip label={item} color="primary" />
                              )}
                            </Stack>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell align="center">
                    {" "}
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          sx={{ m: 1 }}
                          checked={item.enabled}
                          onChange={(e) => handleonchange(e, item._id)}
                        />
                      }
                    />
                  </TableCell>

                  <TableCell align="center">
                    {moment(item.createdAt).format("LLL")}
                  </TableCell>
                  <TableCell align="center">
                    {moment(item.updatedAt).fromNow()}
                  </TableCell>
                  <TableCell align="center">
                    <EditIcon />

                    <DeleteIcon onClick={() => handleRemove(item._id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack  >
            <Pagination className="d-flex justify-content-end pb-3" count={10} size="small" />
          </Stack>
      </Box>
    </Container>
  );
};

export default ManageAdmin;
