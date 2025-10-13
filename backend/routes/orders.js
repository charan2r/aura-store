const express = require("express");
const router = express.Router();
const Order = require("../models/complaintmodel");
const User = require("../models/user");
const Product = require("../models/product");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Get All Orders Route
app.get("/get-orders", async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
});

// Get Orders for a User
app.post("/find-my-order", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find orders for this user
    const orders = await Order.find({ userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    // Function to get product details for each productId
    const findProductDetails = async (productIds) => {
      try {
        const productDetails = [];

        // Make API calls for each productId
        for (const productId of productIds) {
          try {
            const product = await Product.findById(productId);
            if (product) {
              productDetails.push(product);
            }
          } catch (err) {
            console.error(`Error fetching product ${productId}:`, err);
          }
        }

        return productDetails;
      } catch (error) {
        throw new Error("Error fetching product details: " + error.message);
      }
    };

    // Get product details for each order
    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const productDetails = await findProductDetails(order.productIds);
        return {
          ...order.toObject(),
          products: productDetails,
        };
      })
    );

    res.status(200).json({
      success: true,
      orders: ordersWithProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error finding orders",
      error: error.message,
    });
  }
});

// Place Order Route
router.post("/place-order", async (req, res) => {
  try {
    const { userId, date, time, address, price, productsOrdered } = req.body;

    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    const trackingId = Math.random()
      .toString(36)
      .substring(2, 14)
      .toUpperCase();

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const productIds = productsOrdered.map((item) => item.productId);

    const productDetails = await Product.find({
      productId: { $in: productIds },
    });

    const order = new Order({
      userId,
      orderId,
      date,
      time,
      address,
      email: user.email,
      name: user.name,
      productIds,
      trackingId,
      price,
    });

    await order.save();

    const emailHtml = `<div>Order Confirmation for ${user.name}...</div>`;
    await transporter.sendMail({
      from: `pecommerce8@gmail.com`,
      to: user.email,
      subject: "Order Confirmation",
      html: emailHtml,
    });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      orderId,
      trackingId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
});
