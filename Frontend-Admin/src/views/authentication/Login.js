import React, { useContext, useState } from 'react';
import { Grid, Box, Card, Typography } from '@mui/material';
import {
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox
} from '@mui/material';
import { Link } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import UserContext from 'src/store/context';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { admin_login } from 'src/services/auth.service';
import api from 'src/services/api';
import { useNavigate } from "react-router";

const Login2 = (props) => {
  const {state,dispatch} = useContext(UserContext);
  const [user,setUser] = useState({userName: "",password:""});
  const history = useNavigate();
  // const initialValues = {
  //   userName: '',
  //   password: '',
  // };
  // const validationSchema = Yup.object({
  //   userName: Yup.string().required('Required'),
  //   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  // });
  const handleInput = (event)=>{
    user[event.target.name] = event.target.value;
    setUser(user);
    console.log(user);
  }
  const loginSubmit = async (e)=>{
    e.preventDefault();
    console.log('loginSubmit is running');
    const u = await admin_login(user);
    dispatch({type:"ADMIN_LOGIN",payload:u.token});
    state.token = u.token;
    setTimeout(()=>{dispatch({type:"HIDE_LOADING"})},2000);
    localStorage.setItem("state",JSON.stringify(state));
    api.defaults.headers.common["Authorization"] = `Bearer ${u.token}`;
    history("/dashboard");
}
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <form onSubmit={loginSubmit} method="post">
                <Stack>
                  <Box>
                      <Typography
                        variant="subtitle1" 
                        fontWeight={600} 
                        component="label" 
                        htmlFor='userName' 
                        mb="5px">
                          Username
                        </Typography>
                      <CustomTextField id="userName" onChange={handleInput} name="userName" variant="outlined" fullWidth />
                  </Box>
                  <Box mt="25px">
                      <Typography variant="subtitle1"
                          fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
                      <CustomTextField id="password" onChange={handleInput} name="password" type="password" variant="outlined" fullWidth />
                  </Box>
                  <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                      <FormGroup>
                          <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Remeber this Device"
                          />
                      </FormGroup>
                      <Typography
                          component={Link}
                          to="/"
                          fontWeight="500"
                          sx={{
                              textDecoration: 'none',
                              color: 'primary.main',
                          }}
                      >
                          Forgot Password ?
                      </Typography>
                  </Stack>
                </Stack>
                <Box>
                  <Button
                      color="primary"
                      variant="contained" 
                      size="large"
                      fullWidth
                      type="submit"
                  >
                      Sign In
                  </Button>
                </Box>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
