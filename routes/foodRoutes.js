import express from "express";
import multer from "multer";
import path from "path";
import {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post("/", upload.single("img"), createFood);
router.get("/", getAllFoods);
router.get("/:id", getFoodById);
router.put("/:id", upload.single("img"), updateFood);
router.delete("/:id", deleteFood);

export default router;
