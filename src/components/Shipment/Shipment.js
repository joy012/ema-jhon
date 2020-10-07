import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const onSubmit = data => {
      const savedCart = getDatabaseCart(); 
      const orderDetails = {products: savedCart, shipment: data, orderTime: new Date().toDateString()}
      orderDetails.name = loggedInUser.name;
      orderDetails.email = loggedInUser.email;

      fetch('http://localhost:3200/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
          if(data){
            processOrder();
            alert('Your order has placed successfully')
          }
        })
    }

  

  return (
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
  );
};

export default Shipment;