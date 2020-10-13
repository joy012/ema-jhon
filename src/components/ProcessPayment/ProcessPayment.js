import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from '../SimpleCardForm/SimpleCardForm';


const stripePromise = loadStripe('pk_test_51HbUYwLJaT6NskCoWJaxCvGEaf5m22se5SoZAYkZzuKWRBYHPsb20vK8Na5nWiisHU1wEhDOHcCk3In7PL8SkibX00seYjlM0Z');


const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}/>
        </Elements>
    );
};

export default ProcessPayment;