import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const PlaceOrder = () => {
    const {cartItems, food_list, url, getTotalcartAmount, token} =useContext(StoreContext);
  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  });
   const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));

  };

  useEffect(() => {
  console.log(data);
  }, [data]);


  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
     let itemInfo = item;
     itemInfo["quantity"] = cartItems[item._id];
     orderItems.push(itemInfo);
      }
    })
   let orderData = {
    address : data,
    items : orderItems,
    amount : getTotalcartAmount() +2
   }

    let response = await axios.post(`${url}/api/order/place`, orderData, {headers:{token}});
    if (response.data.success) {
        const {session_url} = response.data;
        window.location.replace(session_url);
    }
    else{
        alert(response.data.message);
    }

     
  }
  
   const navigate = useNavigate()

  useEffect(() => {
    if(!token){
      navigate("/cart")
    }else if(getTotalcartAmount() === 0){
      navigate("/cart")
    }


  }, [token, navigate, getTotalcartAmount]);


  return (
    <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
            <p className="title">
                Delivery Information
            </p>
            <div className="multi-fields">
                <input required type="text" placeholder='First Name' onChange={onChangeHandler} value={data.firstName} name="firstName"  />
                <input required type="text" placeholder='Last Name' onChange={onChangeHandler} value={data.lastName} name="lastName" />
            </div>
            <input required type="text" placeholder='Email' onChange={onChangeHandler} value={data.email} name="email"/>
            <input required type="text" placeholder='Street' onChange={onChangeHandler} value={data.street} name="street"/>
            <div className="multi-fields">
                <input required type="text" placeholder='city' onChange={onChangeHandler} value={data.city} name="city"/>
                <input required type="text" placeholder='state' onChange={onChangeHandler} value={data.state} name="state" />
            </div>
            <div className="multi-fields">
                <input required type="text" placeholder='Zip Code' onChange={onChangeHandler} value={data.zipCode} name="zipCode"/>
                <input required type="text" placeholder='Country' onChange={onChangeHandler} value={data.country} name="country" />
            </div>
            <input required type="text" placeholder='Phone' onChange={onChangeHandler} value={data.phone} name="phone" maxLength={10} />
        </div>
        <div className="place-order-right">
        <div className='cart-total'>
          <h2> Cart Total</h2>
          <div>
            <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalcartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalcartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <b>Total</b>
                <b>{getTotalcartAmount()===0?0:getTotalcartAmount() + 2}</b>

            </div>

            
          </div>
          <button type='submit'>PROCEED TO CHECKOUT</button>
        </div>
        </div>

    </form>
  )
}

export default PlaceOrder