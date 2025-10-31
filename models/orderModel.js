import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  User: {
    type:String,
    required: true,
  },
  orderItems: [
    {
      title: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    enum: ["Cash on Delivery", "UPI", "Card", "NetBanking"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed","refunded"],
    default: "Pending",
  },
  orderStatus: {
    type: String,
    enum: ["Processing", "confirmed",,"preparing", "Out for Delivery", "Delivered", "Cancelled"],
    default: "Processing",
  },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
