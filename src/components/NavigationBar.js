import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Link as Anchor, useNavigate} from 'react-router-dom';
import Link from '@mui/material/Link';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useLocation} from 'react-router-dom';

const Logo = () => {
  return(
    <React.Fragment>
      <ShoppingCart />
      <Typography variant="h6" padding={1} noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
        upGrad E-Shop
      </Typography>
    </React.Fragment>
  )
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(50),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const SearchBar = (props) => {
  if(props.isLoggedIn) {
    return (
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onInput={(e) => {
          props.dispatch({type: 'setSearch', payload: e.currentTarget.firstChild.value})
        }}/>
      </Search>
    )
  }
}

const Menu = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if(location.pathname === '/login' || location.pathname === '/signup') {
    return(
      <Box sx={{ typography: 'body1', '& > :not(style) + :not(style)': {ml: 2, mr: 2,},}}>
        <Link color="inherit" variant="body2" href='/login'>Login</Link>
        <Link color="inherit" variant="body2" href='/signup'>Sign up</Link>
      </Box>
    )
  }
  return(
    <React.Fragment>
      <Box sx={{ typography: 'body1', '& > :not(style)': {ml: 1, mr: 1,},}}>
        {props.isLoggedIn && <Link component="button" color="inherit" variant="body2" onClick={() => {navigate('/')}}>Home</Link>}
        {props.isAdmin && <Link component="button" color="inherit" variant="body2" onClick={() => {navigate('/addproduct')}}>Add Product</Link>}
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        {props.isLoggedIn ? <Button color="inherit" className='logout' onClick={() => {
          dispatch({type: 'logout'});
          navigate('/');
        }}>Logout</Button> : <Button color="inherit"><Anchor to='login'>Login</Anchor></Button>}
      </Box>
    </React.Fragment>
  )
}

export default function NavigationBar() {

  const user = useSelector(state => state.user);
  const isLoggedIn = Object.keys(user).length !== 0;
  const isAdmin = isLoggedIn && user.isAdmin;
  const dispatch = useDispatch();
  if(localStorage.getItem('admin@upgrad.com') === null) {
    const adminDetails = {
      contactNumber: "999999999",
      email: "admin@upgrad.com",
      firstName: "Kshitiz",
      isAdmin: true,
      lastName: "Singh",
      password: "pass@admin"
    };
    localStorage.setItem('admin@upgrad.com', JSON.stringify(adminDetails));
  }
  return (
    <React.Fragment>
      <Box display='fixed' className='nav-bar' sx={{ flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Logo />
            <SearchBar isLoggedIn={isLoggedIn} dispatch={dispatch}/>
            <Box sx={{ flexGrow: 1 }} />
            <Menu isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </React.Fragment>
    
  );
}
