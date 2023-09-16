import './App.css';
import NavigationBar from './components/NavigationBar';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Content from './components/Content';
import { Routes, Route} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProductDetails from './components/ProductDetails';
import NoMatch from './components/NoMatch';
import Order from './components/Order';
import { CssBaseline } from '@mui/material';
import ProductForm from './components/ProductForm';
import { useDispatch, useSelector } from 'react-redux';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: "#F9F4F3"
    }
  },
});

function App() {
  var dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const isLoggedIn = Object.keys(user).length !== 0;
  const sessionUser = sessionStorage.getItem('currentUser');
    if(!isLoggedIn && sessionUser !== null) {
      dispatch({type: 'login', payload: JSON.parse(sessionUser)});
    }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
      <div className="App">
        <Routes>
          <Route path="/" element={<NavigationBar />}>
            <Route index element={<Content />} />
            <Route path="products/:productId" element={<ProductDetails />} />
            <Route path="modifyproduct/:productId" element={<ProductForm />} />
            <Route path="addproduct" element={<ProductForm />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="orders" element={<Order />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
