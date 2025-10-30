import { createContext, useEffect, useState } from "react";

import axios from "axios";






export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
const[cartItems,setCartItem]= useState({});
const [token, setToken] = useState("");
const [food_list, setFoodList] = useState([]);

const url = 'http://localhost:4000';


const addToCart = async(itemId) => {
  const currentCart = cartItems || {};
  if(!currentCart[itemId]) {
    setCartItem((prev) => ({...prev || {}, [itemId]:1}))
}else{
  setCartItem((prev) => ({...prev || {}, [itemId]:(prev[itemId] || 0)+1}))
}
if(token){
  await axios.post(`${url}/api/cart/add`, {itemId},{headers:{token}})
}
}

const removeFromCart = async(itemId) => {
  setCartItem((prev) => {
    const currentCart = prev || {};
    return {...currentCart, [itemId]:Math.max((currentCart[itemId] || 0)-1, 0)};
  })
  if(token){
    await axios.post(`${url}/api/cart/remove`, {itemId},{headers:{token}})
  }
} 

const  getTotalcartAmount = (itemid)=>{
  let totalAmount = 0;
  const currentCart = cartItems || {};
  for(let item in currentCart){
    if(currentCart[item] > 0){
      let iteminfo= food_list.find((product) => product._id === item);
      if(iteminfo){
        totalAmount += (iteminfo.price * currentCart[item]); 
      }
    }
  }

return totalAmount;
}

const fetchFoodList = async ()=>{
  const response = await axios.get(`${url}/api/food/list`)

setFoodList(response.data.data)  

}


const loadCartData = async (token) => {
  if (token) {
    try {
      const response = await axios.get(`${url}/api/cart/list`, { headers: { token } });
      setCartItem(response.data.cartData || {});
    } catch (error) {
      console.error("Error loading cart data:", error);
      setCartItem({});
    }
  }
}

useEffect(() => {
  const token = localStorage.getItem('token');
 
  async function loadData(){
    await fetchFoodList()
    if (token) {
      setToken(token);
      await loadCartData(localStorage.getItem('token'));
    }
  }
  loadData()
}, []);

useEffect(() => {
  if (token) {
    loadCartData(token);
  }
}, [token]);




  const contextValue = {
  
    addToCart,
    removeFromCart,
    setCartItem,
    cartItems,
    getTotalcartAmount,
    url,
    token,
    setToken,
    food_list,
    setFoodList,
    fetchFoodList
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
