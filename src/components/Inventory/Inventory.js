import React from 'react';


const Inventory = () => {

    const handleAddProduct = () => {
        const product = {};
        fetch('http://localhost:3200/addProduct', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return (
        <div>
            <form action="/addProduct" method="post">
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