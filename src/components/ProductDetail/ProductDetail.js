import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    let {productKey} = useParams(); //userParams return a object
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({})
    document.title = 'Ema Jhon: Product Detail';

    useEffect(() => {
        fetch('https://ema-jhon-server.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
            setLoading(false);
        })
    }, [productKey])

    return (
        <div>
            <h1>Your Product Details:</h1>
            {
                loading ? <CircularProgress className="center" /> : <Product showAddBtn={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;