import React from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    const shipping = totalPrice > 300 ? 0 : totalPrice > 100 ? 7.99 : totalPrice === 0 ? 0 : 15.99;
    const tax = totalPrice * 0.11; 
    return (
        <div className="cart">
            <h3>Order Summary</h3>
            <p>Items Ordered : {props.totalItem}</p>
            <table className="cart-table">
                {/* toFixed() convert a number to string */}
                <tbody>
                    <tr>
                        <td>Product:</td>
                        <td>${totalPrice.toFixed(2)}</td>  
                    </tr>
                    <tr>
                        <td>Shipping and Handling:</td>
                        <td>${shipping}</td>
                    </tr>
                    <tr>
                        <td>Total before Tax:</td>
                        <td>${(totalPrice + shipping).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Estimated Tax:</td>
                        <td>${tax.toFixed(2)}</td>
                    </tr>
                    <tr className="total-cost">
                        <td>Order Total:</td>
                        <td>${(totalPrice + shipping + tax).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            {props.children}
        </div>
    );
};

export default Cart;