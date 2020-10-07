import React from 'react';


const Inventory = () => {

    const handleAddProduct = () => {
        const product = {};
        fetch('https://ema-jhon-server.herokuapp.com/addProduct', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(result => {
            if(result){
                alert('Product added Successfully')
            }
        })
    }

    return (
        <div>
            <form action="/addProduct" method="POST">
                <p><span>Name: </span><input type="text" name="" id="" /></p>
                <p><span>Price: </span><input type="text" name="" id="" /></p>
                <p><span>Quantity: </span><input type="text" name="" id="" /></p>
                <p><span>Product Image: </span><input type="file" name="" id="" /></p>
            </form>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;