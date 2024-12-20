import userModel from "../models/userModel.js";

//add items to cart
const addToCart = async (req, res) => {
    try {
        // Retrieve the user data
        let userData = await userModel.findById( req.body.userId );

        // Initialize cartData if it doesn't exist
        let cartData = userData.cartData || {}; 

        // Check if the item already exists in cartData, increment or initialize count
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update the user's cartData
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item added to cart successfully" });
        
    } catch (error) {
        console.log(error); 
        res.json({ success: false, message: error.message });
    }
};



//remove item from cart
const removeFromCart = async (req, res) => {
    try {
       
        let userData = await userModel.findById( req.body.userId );

        let cartData = userData.cartData || {}; 

       
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
     


        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item removed from the  cart successfully" });
        
    } catch (error) {
        console.log(error); 
        res.json({ success: false, message: error.message });
    }


}

//get cart items
const getCart = async (req, res) => {
   try {
    let userData = await userModel.findById( req.body.userId );
    let cartData = userData.cartData; 
    res.json({ success: true, cartData });
   } catch (error) {
    console.log(error); 
    res.json({ success: false, message: error.message });
    
   }



}

export { addToCart, removeFromCart, getCart }
