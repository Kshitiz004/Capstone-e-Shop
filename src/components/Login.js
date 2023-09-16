import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Alert, Avatar, Box, Button, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, Grid, Link, Snackbar, TextField, ThemeProvider, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import validator from 'validator';

const theme = createTheme();

export default function Login() {
  const [errors, setErrors] = useState({});
  const user = useSelector(state => state.user);
  const [openFailure, setOpenFailure] = useState(false);
  const [openPasswordFailure, setOpenPasswordFailure] = useState(false);
  const isLoggedIn = Object.keys(user).length !== 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {};
    const newErrors = { ...errors };
    for (let [name, value] of data) {
      formData[name] = value;
      validate(name, value, newErrors);
    }
    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return;
    }
    const userData = JSON.parse(localStorage.getItem(formData.email));
    if (userData === null) {
      setOpenFailure(true);
      return;
    }
    if (userData.password !== formData.password) {
      setOpenPasswordFailure(true);
      return;
    }
    dispatch({ type: 'login', payload: userData });
  };

  const validateComponent = (event) => {
    const newErrors = validate(event.currentTarget.name, event.currentTarget.value, { ...errors });
    setErrors(newErrors);
  };

  const validate = (name, value, newErrors) => {
    let error = '';
    if (!value) {
      error = 'Value required!';
    } else {
      switch (name) {
        case 'email':
          if (!validator.isEmail(value)) {
            error = 'Please enter a proper Email ID';
          }
          break;
      }
    }
    if (error === '') {
      delete newErrors[name];
    } else {
      newErrors[name] = error;
    }
    return newErrors;
  };

  if (openFailure) {
    setTimeout(() => {
      setOpenFailure(false);
    }, 2000);
  }
  if (openPasswordFailure) {
    setTimeout(() => {
      setOpenPasswordFailure(false);
    }, 2000);
  }

  return (
    <ThemeProvider theme={theme}>
      <Snackbar open={openFailure} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          User not found
        </Alert>
      </Snackbar>
      <Snackbar open={openPasswordFailure} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          The password that is entered is wrong
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs" className="form-container">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="form-title">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <div className='form-input'>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={validateComponent}
                error={errors.hasOwnProperty('email')}
                helperText={errors.email}
                className="input-field"
              />
            </div>
            <div className='form-input'>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={validateComponent}
                error={errors.hasOwnProperty('password')}
                helperText={errors.password}
                className="input-field"
              />
            </div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="sign-in-btn"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/signup" variant="body2" className="sign-up">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
