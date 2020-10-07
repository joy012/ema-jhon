import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    let {productKey} = useParams(); //userParams return a object
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch('http://localhost:3200/product/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])

    return (
        <div>
            <h1>Your Product Details:</h1>
            <Product showAddBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;