import React, { useState } from "react";
import { login } from "../../function/auth";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";


import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {toast} from'react-toastify'


const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("location", location);
  const [value, setValue
  ] = useState({
    username: "",
    password: "",
  });

  const roleBaseRedirect = (role) => {
    let intended = location.state;
    if(intended){
      navigate('../'+intended)
    }else{
       if (role === "admin") {
      navigate("/admin/index");
    } else {
      navigate("/");
    }
  };
    }

   
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    //code
    login(value)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          },
        });
        localStorage.setItem("token", res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
        console.log(res)
        toast.success('ยินดีต้อนรับ',res.data)
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data);
      });
  };


  return (

        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChange}
                />
                <TextField 
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
                <FormControlLabel disabled
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#Unsuccess" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          
          </Container>
        </ThemeProvider>

  );
}
export default Login;