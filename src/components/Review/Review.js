import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link, useHistory } from 'react-router-dom';
import gifImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleCheckout = () => {
        history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        const updatedCart = cart.filter(product => product.key !== productKey);
        setCart(updatedCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        // cart
        const savedCart = getDatabaseCart(); //every key is set as a property inside this object
        const productKeys = Object.keys(savedCart); //return a array of the keys

        fetch('http://localhost:3200/productByKey', {
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
    const totalItem = cart.reduce((total, product) => total + product.quantity, 0);
    const thankYou = <img src={gifImage} alt='/' />
    return ( 
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem key={product.key} removeProduct={removeProduct} product={product}></ReviewItem>)
                }
                {
                    orderPlaced && thankYou
                }
            </div>
            <div className="cart-container">
                <Cart totalItem={totalItem} cart={cart}>
                    {/* react will set this button child as children property of cart */}
                    <button onClick={handleCheckout} className="add-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;