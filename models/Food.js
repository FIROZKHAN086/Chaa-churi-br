import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  trending: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);
