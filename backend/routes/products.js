const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Get Products by Category Route
router.get("/category", async (req, res) => {
  try {
    const { category } = req.query;

    // If a category is provided, normalize and filter by category
    let query = {};
    if (category) {
      const normalizedCategory = category.toLowerCase();
      let searchCategory;

      switch (normalizedCategory) {
        case "electronics":
          searchCategory = "Electronics";
          break;
        case "computers":
          searchCategory = "Computers";
          break;
        case "furniture":
          searchCategory = "Furniture";
          break;
        default:
          searchCategory = category;
      }

      query = { category: searchCategory };
    }

    // Fetch products based on the query (either specific or all categories)
    const products = await Product.find(query);

    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
      acc[product.category] = acc[product.category] || [];
      acc[product.category].push(product);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      productsByCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
});

// Get All Products Route
router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
});

// Get Product by Product ID Route
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    // Find product by productId
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
});

// Create Product (Admin only)
router.post("/create-product", async (req, res) => {
  try {
    const productData = req.body;

    // Generate unique 6-digit productId
    const productId = Math.floor(100000 + Math.random() * 900000).toString();
    const product = new Product(productData);
    const result = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
});

// Update Product (Admin only)
router.put("/update-product", async (req, res) => {
  try {
    const { productId, updates } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!updates || typeof updates !== "object") {
      return res.status(400).json({
        success: false,
        message: "Updates must be a valid object",
      });
    }

    // Only allow updates for certain fields (security measure)
    const allowedFields = [
      "name",
      "price",
      "img",
      "category",
      "rating",
      "inStockValue",
      "soldStockValue",
      "visibility",
    ];

    const filteredUpdates = {};
    for (const key in updates) {
      if (allowedFields.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    }

    // Find and update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      { $set: filteredUpdates },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
});

module.exports = router;
