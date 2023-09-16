import { Button, CardMedia, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddressDetails from "./AddressDetails";
import OrderSummary from './OrderSummary';
import NoMatch from "./NoMatch";
import './Order.css';


const steps = ['Items', 'Select Address', 'Confirm Order'];

export default function Order() {
    let [searchParams] = useSearchParams();
    const productId = searchParams.get('productId');
    const quantity = !searchParams.get('quantity') ? 1 : searchParams.get('quantity');
    const products = JSON.parse(localStorage.getItem('products'));
    const [address, setAddress] = useState({firstName: '', lastName: '', contactNumber: '', street: '', city: '', state: '', landmark: '', zip: ''});
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user);
    const isLoggedIn = Object.keys(user).length !== 0;

    useEffect(() => {
        if(!isLoggedIn) {
            console.log('reached');
            navigate('/');
        }
    });

    if(!searchParams.get('productId')) {
        return <NoMatch />
    }
    const product = products.find(ele => ele.key == productId);

    const handleNext = () => {
        if(activeStep === 1) {
            var event = new Event('submit', {
                'bubbles': true,
                'cancelable': true
            });
            document.getElementById("addressForm").dispatchEvent(event);
            return;
        } else if(activeStep === steps.length - 1) {
            const newProducts = [...products];
            const index = newProducts.indexOf(product)
            newProducts[index].quantity = newProducts[index].quantity - quantity;
            const dateTime = new Date().toLocaleString();
            newProducts[index].modifiedDate = dateTime;
            // dispatch({type: 'setProducts', payload: newProducts});
            localStorage.setItem('products', JSON.stringify(newProducts));
            dispatch({type: 'setOrderPlacedTrue'});
            navigate('/');
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function OrderStepContent() {
        switch(activeStep) {
            case 0:
                return <ItemDetails />
            case 1:
                return <AddressDetails setAddressCallBack={setAddressCallBack} addressDetails={address}/>
            case 2:
                return <OrderSummary address={address} product={product} quantity={quantity} />
        }
    }
    
    function ItemDetails() {
        return(
            <div className="product-items-section">
                    <div className="product-image">
                        <CardMedia
                            component="img"
                            height="auto"
                            image={product.photo}
                            alt={product.name}
                        />
                    </div>
                    <div className="product-detail">
                        <div className="product-title">
                            <h1 className="product-name">{product.name}</h1>
                        </div>
                        <div>
                            <span className="order-availability">Quantity : {quantity}</span>
                        </div>
                        <div className="product-category">
                            <span>Category: <b>{product.category}</b></span>
                        </div>
                        <div className="product-description">
                            <span>{product.description}</span>
                        </div>
                        <div className="product-price">
                            <span> Total Price: &#8377;  {product.price * quantity}</span>
                        </div>
                    </div>
                </div>
        );
    }

    function setAddressCallBack(addressDetails) {
        setAddress(addressDetails);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    return(
        <div id='orderPage'>
            <Box sx={{ width: '80%', height: '45px', background: 'white', ml: 'auto', mr: 'auto', mt: '8px'}}>
                <Stepper activeStep={activeStep} sx={{paddingTop:"8px"}}>
                    {
                        steps.map((label) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })
                    }
                </Stepper>
                <OrderStepContent/>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 , justifyContent: 'center'}}>
                    <Button
                        color="inherit"
                        variant="text"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Button variant="contained" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                    </Button>
                </Box>
            </Box>
        </div>
    );
}