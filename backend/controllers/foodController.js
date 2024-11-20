import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";

// Add food item
const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const imageFile = req.file; // Get the uploaded file

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
        });
        const imageUrl = imageUpload.url;

        const newFood = new foodModel({
            name,
            description,
            price,
            image: imageUrl,
            category,
        });

        // Save the new food item to the database
        await newFood.save();
        res.json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};
  //All Food List
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});

        res.json({ success: true, data: foods });
        console.log(foods);

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }

}


const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully" });
        
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}





export { addFood, listFood, removeFood };
