import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import run from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";
import path from "path";
import foodRoutes from "./routes/foodRoutes.js";
import paymentRoutes from "./routes/StripeRoutes.js";



dotenv.config();

const app = express();
app.use(express.json()); 
run();

app.use(cors());



app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// All API Here Acces 
app.use("/api/orders", orderRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/payment", paymentRoutes);



app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
