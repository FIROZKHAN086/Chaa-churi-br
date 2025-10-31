import { Food } from "../models/Food.js";
import fs from "fs";
import path from "path";

//  Create Food
export const createFood = async (req, res) => {
  
  try {

    const { title, description, price, category, rating, trending, isAvailable ,ingredients } = req.body;
    const img = req.file ? `/uploads/${req.file.filename}` : null;

    const food = new Food({
      title,
      description,
      price,
      category,
      rating,
      trending,
      isAvailable,
      img,
      ingredients,
    });

    await food.save();
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get All Foods
export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get Food By ID
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update Food
export const updateFood = async (req, res) => {
  try {
    const { title, description, price, category, rating, trending, isAvailable ,ingredients } = req.body;
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    if (req.file) {
     
      if (food.img) {
        const oldPath = path.join(process.cwd(), food.img);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      food.img = `/uploads/${req.file.filename}`;
    }

    food.title = title || food.title;
    food.description = description || food.description;
    food.price = price || food.price;
    food.category = category || food.category;
    food.rating = rating || food.rating;
    food.trending = trending ?? food.trending;
    food.isAvailable = isAvailable ?? food.isAvailable;
    food.ingredients = ingredients ? JSON.parse(ingredients) : food.ingredients;

    const updatedFood = await food.save();
    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Delete Food
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    if (food.img) {
      const filePath = path.join(process.cwd(), food.img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await food.deleteOne();
    res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
