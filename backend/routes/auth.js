const express = require("express");
const User = require("../models/user");
const Seller = require("../models/seller");
const router = express.Router();
const bcrypt = require("bcrypt");

// Register user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const userId = require("crypto").randomBytes(8).toString("hex"); // Generate unique user ID
    const user = new User({ name, email, password, userId, phone });
    await user.save();

    // Automatically log the user in
    req.session.userId = user.userId;

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check account status
    if (user.accountStatus === "suspended") {
      return res.status(403).json({ error: "Account is suspended" });
    }

    if (user.accountStatus === "blocked") {
      return res.status(403).json({ error: "Account is blocked" });
    }

    // If account status is 'open', proceed with login
    if (user.accountStatus === "open") {
      // Save userId in session
      req.session.userId = user.userId;

      // Respond with success
      return res
        .status(200)
        .json({ message: "Login successful", userId: user.userId });
    }

    // Handle any other unexpected account status
    return res.status(400).json({ error: "Invalid account status" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Error logging in" });
  }
});

// Logout user
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Error logging out" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  });
});

// Get user details by userId
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne(
      { userId },
      { name: 1, email: 1, phone: 1, _id: 0 }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ name: user.name });
  } catch (err) {
    res.status(500).json({ error: "Error fetching user details" });
  }
});

// Get all User Details Route
router.get("/get-user", async (req, res) => {
  try {
    const users = await mongoose.model("User").find(
      {}, // Remove filter to get all users
      "-password" // Exclude only the password field
    );

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user details",
      error: error.message,
    });
  }
});

// Update Account Status Route
router.put("/update-account-status", async (req, res) => {
  try {
    const { userId, accountStatus } = req.body;

    // Find and update the user, and get the updated document
    const updatedUser = await mongoose.model("User").findOneAndUpdate(
      { userId: userId },
      { accountStatus },
      { new: true } // This option returns the modified document rather than the original
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Account status updated successfully",
      user: {
        userId: updatedUser.userId,
        accountStatus: updatedUser.accountStatus,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating account status",
      error: error.message,
    });
  }
});

// Seller Login
router.post("/seller-login", async (req, res) => {
  try {
    const { sellerId, emailOrPhone, password } = req.body;

    // Validate required fields
    if (!sellerId || !emailOrPhone || !password) {
      return res.status(400).json({
        error: "Missing required fields",
        details: "Seller ID, email/phone, and password are required",
      });
    }

    // Find seller by ID and email/phone
    const seller = await Seller.findOne({
      sellerId,
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!seller) {
      return res.status(400).json({
        error: "Invalid credentials",
        details: "No seller found with provided ID and email/phone",
      });
    }

    // Check if email/phone is verified
    if (!seller.emailVerified && !seller.phoneVerified) {
      return res.status(401).json({
        error: "Account not verified",
        details: "Please verify your email or phone number before logging in",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
        details: "Incorrect password provided",
      });
    }
    // Update loggedIn status
    seller.loggedIn = "loggedin";
    await seller.save();
    // Store sellerId in session
    req.session.sellerId = sellerId;
    res.status(200).json({
      success: true,
      message: "Login successful",
      sellerId,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error logging in",
      details: error.message,
    });
  }
});

// Seller Signup
router.post("/seller/signup", async (req, res) => {
  try {
    const { phoneNumber, emailId, password } = req.body;

    // Check if seller already exists
    const existingSeller = await Seller.findOne({ email: emailId });
    if (existingSeller) {
      return res.status(400).json({ error: "Seller already exists" });
    }

    // Generate unique seller ID (MBSLR + 5 digits)
    let sellerId;
    let isUnique = false;
    while (!isUnique) {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      sellerId = `MBSLR${randomNum}`;
      const existingId = await Seller.findOne({ sellerId });
      if (!existingId) isUnique = true;
    }

    // Create new seller with required fields from schema
    const seller = new Seller({
      name: "Not Available",
      email: emailId,
      password: password,
      sellerId: sellerId,
      emailVerified: false,
      phoneVerified: false,
      phoneNumber: phoneNumber,
      businessName: "Not Available",
      businessAddress: "Not Available",
      businessType: "Not Available",
    });

    await seller.save();

    // Store sellerId in session
    req.session.sellerId = sellerId;

    res.status(201).json({
      message: "Seller registered successfully",
      sellerId,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error registering seller",
      message: err.message,
    });
  }
});

// Seller Verify
router.post("/verify-seller", async (req, res) => {
  try {
    const { sellerId } = req.body;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required",
      });
    }

    // Find seller by sellerId
    const seller = await Seller.findOne({ sellerId });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Invalid seller ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Valid seller ID",
      loggedIn: seller.loggedIn,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying seller ID",
      error: error.message,
    });
  }
});

// Seller Logout
router.post("/seller/logout", async (req, res) => {
  try {
    const { sellerId } = req.body;

    if (!sellerId) {
      return res.status(400).json({
        error: "Seller ID is required",
      });
    }

    const seller = await Seller.findOne({ sellerId });

    if (!seller) {
      return res.status(404).json({
        error: "Seller not found",
      });
    }

    seller.loggedIn = "loggedout";
    await seller.save();

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Error logging out" });
      }
      res.clearCookie("connect.sid");
      res.json({
        success: true,
        message: "Seller logged out successfully",
        loggedIn: "loggedout",
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Error logging out",
      details: error.message,
    });
  }
});

// Get seller details by sellerId
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;
    const seller = await Seller.findOne(
      { sellerId },
      {
        name: 1,
        email: 1,
        businessName: 1,
        businessAddress: 1,
        businessType: 1,
        _id: 0,
      }
    );

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.status(200).json(seller);
  } catch (err) {
    res.status(500).json({ error: "Error fetching seller details" });
  }
});

module.exports = router;
