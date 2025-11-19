const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
//const nodemailer = require('nodemailer');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
//const uuid = require('uuid');
//const bcrypt = require('bcrypt');
//const Seller = require('./models/seller');
const cartRoutes = require("./routes/cart");
const complaintsRoutes = require("./routes/complaints");
const couponRoutes = require("./routes/coupon");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use("/public", express.static(path.join(__dirname, "../frontend/public")));

// Middleware
app.use(
  cors({
    origin: [
      " http://localhost:5173",
      "http://localhost:3000",
      "https://e-commerce-three-pi-59.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(express.json());
app.use(require("cookie-parser")());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/complaints", complaintsRoutes);
app.use("/coupon", couponRoutes);
app.use("/products", productRoutes);

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Keep-Alive Route
app.get("/keep-alive", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running",
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce Backend!");
});

// Start the backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
