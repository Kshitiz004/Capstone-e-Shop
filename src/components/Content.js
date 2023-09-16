import {useDispatch, useSelector} from 'react-redux';
import Product from './Product';
import { useEffect, useState } from 'react';
import SortProductFilter from './SortProductFilter';
import CategoryToggleFilter from './CategoryToggleFilter';
import InitialProducts from '../common/InitialProducts';
import { Alert, Snackbar } from '@mui/material';

const FilterProducts = (products, setDisplayProducts) => {
    const displaySetting = useSelector((state) => state.productPageFilters);

    useEffect(() => {
        const filterAndSortProducts = () => {
            let newDisplayProducts = [...products];
            newDisplayProducts = newDisplayProducts.filter(product => {
                if(product.name.toLowerCase().indexOf(displaySetting.search.toLowerCase()) === -1) {
                    return false;
                }
                if(displaySetting.category !== 'ALL' && product.category !== displaySetting.category) {
                    return false;
                }
                return true;
            });
            if(displaySetting.sortBy === 'Price: High to Low') {
                newDisplayProducts.sort(function(a, b){return b.price - a.price});
            } else if(displaySetting.sortBy === 'Price: Low to High') {
                newDisplayProducts.sort(function(a, b){return a.price - b.price});
            } else if(displaySetting.sortBy === 'Newest') {
                newDisplayProducts.sort(function(a, b){return new Date(a.modifiedDate) > new Date(b.modifiedDate)});
            }
            setDisplayProducts(newDisplayProducts);
        };
    
        filterAndSortProducts();
    }, [products, displaySetting, setDisplayProducts]);
    

}

export const Filters = ({isHideSort}) => {
    return(
        <div style={{display: 'flex', marginTop: '16px'}}>
                <SortProductFilter isHide={isHideSort}/>
                <CategoryToggleFilter />
                <div style={{flex: 1}}></div>
            </div>
    );
}

const ProductCatelogue = ({displayProducts, isAdmin}) => {
    return(
        <div id='productCatelogue' className='flex-wrap'>
                {
                    displayProducts.map(element => {
                        return(
                            <Product
                            key={element.key}
                            productDetails={element}
                            isAdmin={isAdmin}
                            />
                        );
                    })
                }
            </div>
    );
}

export default function Content () {
    const user = useSelector((state) => state.user);
    let products = JSON.parse(localStorage.getItem('products'));
    const isLoggedIn = Object.keys(user).length !== 0;
    const isAdmin = isLoggedIn && user.isAdmin;
    const dispatch = useDispatch();
    const [displayProducts, setDisplayProducts] = useState(products);
    const orderPlaced = useSelector((state) => state.popups.orderPlaced);
    const productDeleted = useSelector((state) => state.popups.productDeleted);
    const productModified = useSelector((state) => state.popups.productModified);
    const productAdded = useSelector((state) => state.popups.productAdded);
    const [reRender, setRerender] = useState(true);
    if((productDeleted !== '' || productModified !== '' || productAdded !== '') && reRender) {
        products = JSON.parse(localStorage.getItem('products'));
        setRerender(false);
        setDisplayProducts(products);
    }

    const handleOrderPlacedClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch({type: 'setorderPlacedFalse'});
    };

    const handleProductDeletedClose = () => {
        setRerender(true);
        dispatch({type: 'setProductDeleted', payload: ''});
    };

    const handleProductModifiedClose = () => {
        setRerender(true);
        dispatch({type: 'setProductModified', payload: ''});
    };

    const handleProductAddedClose = () => {
        setRerender(true);
        dispatch({type: 'setProductAdded', payload: ''});
    };

    if(products === null) {
        const defaultProducts = InitialProducts();
        localStorage.setItem('products', JSON.stringify(defaultProducts));
        dispatch({type: 'setProducts'});
    }
    FilterProducts(products, setDisplayProducts);
    if(!isLoggedIn) {
        return(
            <div className="center fill" style={{ marginTop: '-150px', fontWeight: 'bold', color: 'white'}}>
            Welcome to upGrad E-Shop!</div>
        );
    }
    const [ vertical, horizontal ] = ['top', 'right'];
    return(
        <div id='productPage'>
            <Snackbar open={orderPlaced} autoHideDuration={6000} onClose={handleOrderPlacedClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleOrderPlacedClose} severity="success" sx={{ width: '100%' }} >
                    Order Placed successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={productDeleted !== ''} autoHideDuration={2000} onClose={handleProductDeletedClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleProductDeletedClose} severity="success" sx={{ width: '100%' }}>
                    Product {productDeleted} deleted successfully
                </Alert>
            </Snackbar>
            <Snackbar open={productModified !== ''} autoHideDuration={2000} onClose={handleProductModifiedClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleProductModifiedClose} severity="success" sx={{ width: '100%' }}>
                    Product {productModified} modified successfully
                </Alert>
            </Snackbar>
            <Snackbar open={productAdded !== ''} autoHideDuration={2000} onClose={handleProductAddedClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleProductAddedClose} severity="success" sx={{ width: '100%' }}>
                    Product {productAdded} added successfully
                </Alert>
            </Snackbar>
            <Filters />
            <ProductCatelogue displayProducts={displayProducts} isAdmin={isAdmin}/>
        </div>
    );
}