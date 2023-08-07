import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { readCategory, editCategory } from "../../../function/category";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Container, Input } from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux/es/hooks/useSelector";


const UpdateCategory = () => {
   const { user } = useSelector((state) => ({ ...state }));
  const params = useParams();
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  //console.log(params.id)
  const [name, setName] = useState();
  useEffect(() => {
    loadData(user.token,params.id);
  }, []);

  const loadData = (authtoken,id) => {
    readCategory(authtoken,id)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editCategory(user.token,params.id, { name })
      .then((res) => {
        navigate("/admin/create-category");
        toast.success("แก้ไข" + res.data.name + "สำเร็จ");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container > 
            
            {loading
          ?<h1> loading <CircularProgress/></h1>
        :
     
          <Box borderRadius={2}
          bgcolor={"white"}
            sx={{
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h2>เพิ่มหมวดหมู่สินค้า</h2>
            <form onSubmit={handleSubmit} className="text-center">
              <Input
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2, fontSize: "var(--joy-fontSize-sm)" }}
              />

              <Button type="submit" variant="outlined">
                Submit
              </Button>
            </form>
          </Box>
             }
        </Container>
   
  );
};

export default UpdateCategory;
