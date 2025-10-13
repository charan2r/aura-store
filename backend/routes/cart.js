const express = require("express");
const router = express.Router();
const Cart = require("../models/cartmodel");
require("dotenv").config();

// Add to Cart Route
router.post("/addtocart", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.productsInCart.push({ productId, quantity });
      await cart.save();
    } else {
      cart = new Cart({ userId, productsInCart: [{ productId, quantity }] });
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding product to cart",
      error: error.message,
    });
  }
});

// Get Cart by User ID Route
router.post("/get-cart", async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found for this user" });

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
});

// Route to update quantity
router.put("/update-quantity", async (req, res) => {
  const { userId, productId, productQty } = req.body;

  if (!userId || !productId || typeof productQty !== "number") {
    return res.status(400).json({
      message: "userId, productId, and a valid productQty are required.",
    });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const product = cart.productsInCart.find(
      (item) => item.productId === productId
    );

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found in the cart." });
    }

    product.productQty = productQty;
    await cart.save();

    res.status(200).json({ message: "Quantity updated successfully." });
  } catch (error) {
    console.error("Error updating quantity:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the quantity." });
  }
});

// Delete Item from Cart Route
router.post("/delete-items", async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res
      .status(400)
      .json({ message: "userId and productId are required." });
  }

  try {
    const result = await Cart.updateOne(
      { userId },
      { $pull: { productsInCart: { productId } } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Item deleted successfully." });
    } else {
      res.status(404).json({ message: "Item not found in the cart." });
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the item." });
  }
});

module.exports = router;
