import React, { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    document.title = 'Ema Jhon: Shop';
    
    useEffect(() => {
        fetch('https://ema-jhon-server.herokuapp.com/products?search='+search)
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [search])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://ema-jhon-server.herokuapp.com/productByKey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => {
            const cartProducts = data.map(product => {
                product.quantity = savedCart[product.key];
                return product;
            })
            setCart(cartProducts);
        })
    }, [])
    
    const handleAddProduct = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart= [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    const handleSearch = event => {
        setSearch(event.target.value);
    }
    const totalItem = cart.reduce((total, product) => total + product.quantity, 0);
    return (
        <div className="twin-container">
            <div style={{textAlign:'center', margin: '20px 20px'}}>
                <input onBlur={handleSearch} type="text"/>
            </div>
            <div className="product-container">
                {
                    products.length === 0 && <CircularProgress className="center" />
                }
                {
                    products.map(product => <Product handleAddProduct={handleAddProduct} key={product.key} showAddBtn={true} product={product}>
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart totalItem={totalItem} cart={cart}>
                    <Link to="/review">
                        {/* react will set this button child as children property of cart */}
                        <button className="add-btn">Review Your Order</button> 
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;