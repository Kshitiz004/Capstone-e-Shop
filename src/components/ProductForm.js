import { Button, CssBaseline, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NoMatch from "./NoMatch";
import { Categories } from "./CategoryToggleFilter";

const emptyProduct = {
    name: '',
    category: '',
    manufacturer: '',
    quantity: '',
    price: '',
    photo: '',
    description: ''
};

export default function ProductForm() {
    let { productId } = useParams();
    const products = JSON.parse(localStorage.getItem('products'));
    const productInfo = products.find(ele => ele.key == productId);
    const location = useLocation();
    const[product, setProduct] = useState((location.pathname.indexOf('/modifyproduct') !== -1) ? productInfo : emptyProduct);

    const [errors, setErrors] = useState({});
    const user = useSelector(state => state.user);
    const isLoggedIn = Object.keys(user).length !== 0;
    const isAdmin = isLoggedIn && user.isAdmin;
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        if(!isLoggedIn || !isAdmin) {
            navigate('/');
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {};
        const newErrors = {...errors};
        for(let [name, value] of data) {
            formData[name] = value;
            validate(name, value, newErrors);
        }
        if(Object.keys(newErrors).length !== 0) {
            setErrors(newErrors);
            return;
        }
        if(location.pathname.indexOf('/modifyproduct') === -1) {
            products.push({...product, key: products.length + 1});
        } else {
            products[products.indexOf(productInfo)] = product;
        }
        setProduct(emptyProduct);
        localStorage.setItem('products', JSON.stringify(products));
        dispatch({type: ((location.pathname.indexOf('/modifyproduct') !== -1) ? 'setProductModified' : 'setProductAdded'), payload: product.name});
        navigate('/');
    };
    
      const validateComponent = (event) => {
        setProduct({...product, [event.target.name]: event.target.value});
        const newErrors = validate(event.target.name, event.target.value, {...errors});
        setErrors(newErrors);
      }
    
      const validate = (name, value, newErrors) => {
        let error = '';
        if(!value) {
            error = 'Value required!'
        }
        if(error === '') {
            delete newErrors[name]
        } else {
            newErrors[name] = error;
        }
        return newErrors;
      }

    if(location.pathname.indexOf('/modifyproduct') !== -1 && productInfo === undefined) {
        return <NoMatch />
    }
    return(
        <div>
            <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {location.pathname.indexOf('/modifyproduct') !== -1 ? 'Modify Product' : 'Add Product'}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label={"Name"}
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('name')}
                  helperText={errors.name}
                  value={product.name}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  select
                  id="category"
                  label="Category"
                  name="category"
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('category')}
                  helperText={errors.category}
                  value={product.category}
                >
                    {
                        Categories.map(category => {
                            return(
                                <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                            )
                        })
                    }
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="manufacturer"
                  label="Manufacturer"
                  name="manufacturer"
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('manufacturer')}
                  helperText={errors.manufacturer}
                  value={product.manufacturer}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="quantity"
                  label="Available Items"
                  type="number"
                  id="quantity"
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('quantity')}
                  helperText={errors.quantity}
                  value={product.quantity}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  id="price"
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('price')}
                  helperText={errors.price}
                  value={product.price}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="photo"
                  label="Image Url"
                  id="photo"
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('photo')}
                  helperText={errors.photo}
                  value={product.photo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Product Description"
                  id="description"
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('description')}
                  helperText={errors.description}
                  value={product.description}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {location.pathname.indexOf('/modifyproduct') !== -1 ? 'MODIFY PRODUCT' : 'SAVE PRODUCT'}
            </Button>
          </Box>
        </Box>
      </Container>
        </div>
    );
}