import { Box, Button, Checkbox, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import validator from 'validator';

export default function AddressDetails({setAddressCallBack, addressDetails}) {

    const [address, setAddress] = useState(addressDetails);
    const user = useSelector(state => state.user);

    let internalSavedAddresses = JSON.parse(localStorage.getItem(user.email + '_addresses'));
    internalSavedAddresses = (internalSavedAddresses == null) ? [] : internalSavedAddresses;

    const [savedAddresses, setSavedAddresses] = useState(internalSavedAddresses);

    const handleSubmit = () => {
        const data = new FormData(document.getElementById("addressForm"));
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
        setAddressCallBack(formData);
        return false;
    };

    const handleSaveAddress = () => {
        const data = new FormData(document.getElementById("addressForm"));
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
        const newSavedAddresses = [...savedAddresses, formData];
        localStorage.setItem(user.email + '_addresses', JSON.stringify(newSavedAddresses));
        setSavedAddresses(newSavedAddresses);
    }

    const [errors, setErrors] = useState({});

    const validateComponent = (event) => {
        setAddress({...address, [event.target.name]: event.target.value});
        const newErrors = validate(event.currentTarget.name, event.currentTarget.value, {...errors});
        setErrors(newErrors);
      }
    
      const validate = (name, value, newErrors) => {
        let error = '';
        if(!value && name !== 'landmark') {
            error = 'Value required!'
        } else {
            switch(name) {
                case 'contactNumber':
                    if(!validator.isMobilePhone(value)) {
                        error = 'Please enter a proper contact number'
                    }
                break;
            }
        }
        if(error === '') {
            delete newErrors[name]
        } else {
            newErrors[name] = error;
        }
        return newErrors;
      }

    return(
        <Fragment>
            <Container component="main" maxWidth="lg" sx={{ml: 'auto', mr: 'auto'}}>
            <Typography component="p" variant="p" sx={{margin: 1, paddingTop: 1}}>
                    Select Address
                </Typography>
                <Box component="form" sx={{'& .MuiTextField-root': {maxWidth: '80%'}, flex: 1}} noValidate autoComplete="off">
                    <TextField fullWidth id="standard-select-sort" select label="Select Address:" variant="filled" 
                    onChange={(e) => {
                        setAddress({...JSON.parse(e.target.value)});
                        setErrors({})
                    }}>
                        {savedAddresses.map((savedAddress) => (
                            <MenuItem key={savedAddress.firstName} value={JSON.stringify(savedAddress)}>
                                {savedAddress.firstName + ' ' + savedAddress.lastName + ", " + savedAddress.street + "..."}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                </Container>
            <Container component="main" maxWidth="xs">
        <Typography component="p" variant="p" sx={{textAlign: 'center', mt: 2, mb: 1}}>
            - OR -
          </Typography>
          <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
            Add Address
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} id='addressForm'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            onChange={validateComponent}
            error={errors.hasOwnProperty('firstName')}
            helperText={errors.firstName}
            value={address.firstName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            onChange={validateComponent}
            error={errors.hasOwnProperty('lastName')}
            helperText={errors.lastName}
            value={address.lastName}
          />
        </Grid>
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                name="contactNumber"
                label="Contact Number"
                type="phone"
                id="contactNumber"
                autoComplete="phone"
                onChange={validateComponent}
                error={errors.hasOwnProperty('contactNumber')}
                helperText={errors.contactNumber}
                value={address.contactNumber}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="street"
            name="street"
            label="Street"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={validateComponent}
            error={errors.hasOwnProperty('street')}
            helperText={errors.street}
            value={address.street}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={validateComponent}
            error={errors.hasOwnProperty('city')}
            helperText={errors.city}
            value={address.city ? address.city : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            required
            onChange={validateComponent}
            error={errors.hasOwnProperty('state')}
            helperText={errors.state}
            value={address.state}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="landmark"
            name="landmark"
            label="Landmark"
            fullWidth
            autoComplete="shipping landmark"
            onChange={validateComponent}
            error={errors.hasOwnProperty('landmark')}
            helperText={errors.landmark}
            value={address.landmark}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            onChange={validateComponent}
            error={errors.hasOwnProperty('zip')}
            helperText={errors.zip}
            value={address.zip}
          />
        </Grid>
        <Grid item xs={12}>
        <Button
              fullWidth
              variant="contained"
              onClick={handleSaveAddress}
              sx={{ mt: 3, mb: 2}}
            >
              Save Address
            </Button>
        </Grid>
      </Grid>
      <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, display: 'none'}}
            >
              Sign Up
            </Button>
      </Box>
      </Container>
    </Fragment>
    )
}