import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import login from "../asset/images/login.png";
import { MailOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import { candidate_login } from "../services/auth.service";

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleLogin = async () => {
    // handle api?
    const data = {
      userName: loginData.userName,
      password: loginData.password,
    };
    if (loginData.userName !== " " && loginData.password !== "") {
      const u = await candidate_login(data);
      localStorage.setItem("myQuizApp", JSON.stringify(u));
      if(u.status === 3) {
        navigate("/quiz");
      } else {
        navigate("/your-test");
      }
    }
    
  };

  return (
    <div>
      <Header />
      <div className="login-page">
        <h1 className="login-page__title">Join with us now!!!</h1>
        <div className="login-page__main">
          <img src={login} alt="Log In" />
          <div>
            <Box
              sx={{
                width: "600px",
                backgroundColor: "#fff",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: "10px",
                px: 2,
                py: 3,
              }}
            >
              <FormControl sx={{ width: "100%", my: 2 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="email"
                  value={loginData.userName}
                  onChange={(e) =>
                    setLoginData({ ...loginData, userName: e.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <MailOutline />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Email"
                />
              </FormControl>
              <FormControl sx={{ width: "100%", my: 2 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Mật khẩu"
                />
              </FormControl>
              <div className="login-btn" onClick={handleLogin}>
                Log in
              </div>             
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
