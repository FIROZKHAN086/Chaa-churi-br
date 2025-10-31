import admin from "../firebaseAdmin.js";
import { Order } from "../models/orderModel.js";
import { getMessaging } from "firebase/messaging";
import { sendOrderNotification } from "../utils/sendNotification.js";

//  Create a new order
export const createOrder = async (req, res) => {
  try {
    const { User, orderItems, shippingAddress, paymentMethod, totalPrice , token  } = req.body;



    
    

    if (!orderItems?.length) {
      return res.status(400).json({ message: "No order items found" });
    }

    const newOrder = new Order({ User, orderItems, shippingAddress, paymentMethod, totalPrice });
    const savedOrder = await newOrder.save();

    // Get Admin user token
    
   if (token) {
      await sendOrderNotification(token, savedOrder);
      
      
    }

    res.status(201).json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("User", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  const userId = req.params.id;

  try {
    const orders = await Order.find({ User: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update order status or payment status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const { id } = req.params;


    const order = await Order.findById(id);

    if (!order) {
     
      return res.status(404).json({ message: "Order not found" });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updatedOrder = await order.save();
    
    res.status(200).json({
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("🔥 Error updating order:", error);
    res.status(500).json({ message: error.message });
  }
};


//  Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
