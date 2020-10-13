import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [shippingData, setShippingData] = useState(null);
  document.title = "Ema Jhon: Shipment"
  const onSubmit = data => {
    setShippingData(data);
  }

  const handlePayment = paymentId => {
    const savedCart = getDatabaseCart();
    const orderDetails = { 
      products: savedCart,
      shipment: shippingData,
      paymentId,
      orderTime: new Date().toDateString() 
    }
    orderDetails.name = loggedInUser.name;
    orderDetails.email = loggedInUser.email;

    fetch('https://ema-jhon-server.herokuapp.com/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('Your order has placed successfully')
        }
      })
  }



  return (
    <div className="row justify-content-between align-items-center">
      <div style={{display: shippingData ? 'none' : 'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input name="name" ref={register({ required: true })} placeholder="Your Name" />
          {errors.name && <span className="error">Name is required</span>}
          <input name="email" ref={register({ required: true })} placeholder="Your email" />
          {errors.email && <span className="error">Email is required</span>}
          <input name="address" ref={register({ required: true })} placeholder="address" />
          {errors.address && <span className="error">Address is required</span>}
          <input name="phone" ref={register({ required: true })} placeholder="Phone Number" />
          {errors.phone && <span className="error">Phone Number is required</span>}
          <input type="submit" />
        </form>
      </div>
      <div style={{display: shippingData? 'block' : 'none'}} className="col-md-6 p-5">
        <h1>Pay Your Bill:</h1>
        <ProcessPayment handlePayment = {handlePayment}/>
      </div>
    </div>
  );
};

export default Shipment;