import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const {cartItems, food_list, removeFromCart,getTotalcartAmount, token} = useContext(StoreContext);

    const navigate = useNavigate();
    
    const handleCheckout = () => {
        if (!token) {
            alert("Please login to proceed to checkout");
            return;
        }
        navigate('/order');
    };
  return (

   
    <div className='cart'>
       <div className='cart-items'>
        <div className='cart-items-title'>
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <br/>
        <hr />
        {
    food_list.map((item, index) => {
        if (cartItems[item._id] > 0) {
            return (
                <div key={index}> {/* key should be applied to the root element */}
                    <div className='cart-items-title cart-items-item'>
                        <img src={item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <p>{cartItems[item._id]}</p>
                        <p>{item.price * cartItems[item._id]}</p>
                        <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                    </div>
                    <hr />
                </div>
            )
        }
        return null; // Return null if the item quantity is 0, to avoid rendering
    })
}

        
       </div>
       <div className='cart-bottom'>
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
                <p>${getTotalcartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <b>Total</b>
                <b>{getTotalcartAmount()===0?0:getTotalcartAmount() + 2}</b>

            </div>

            
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>

       </div>
        
        </div>
  )
}

export default Cart