import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const { name, price, quantity, key, img } = props.product;
    const totalPrice = (price * quantity).toFixed(2);
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <p>Quantity: {quantity}</p>
                <p>Unit price: {price}</p>
                <p>Total Price: {totalPrice}</p>
                <br />
                <button className="add-btn" onClick={() => props.removeProduct(key)}>Remove</button>
            </div>

        </div>
    );
};

export default ReviewItem;