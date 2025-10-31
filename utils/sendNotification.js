import admin from "../firebaseAdmin.js";


 export const sendOrderNotification = async (token, orderData) => {
  const message = {
    notification: {
      title: " Your Order Sent Successfully!",
      body: `Order from ${orderData.User} - Total ₹${orderData.totalPrice}`,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
  
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};


