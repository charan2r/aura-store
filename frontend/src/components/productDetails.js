/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productdetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/products/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setProduct(data.product);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error fetching product details");
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");
      const quantity = 1;

      const response = await fetch("http://localhost:5000/cart/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Product added to cart successfully", data);
        alert("Product added to cart successfully");
      } else {
        console.log("Error adding product to cart", data.message);
      }
    } catch (error) {
      console.log("Error adding product to cart", error);
    }
  };

  return (
    <>
      <header className="modern">
        <div className="logo">Aura Store</div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#products">Categories</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="cart">🛒</div>
        <div className="auth-links">
          <a href="/auth/login" className="login">
            🔑 Login
          </a>
          <a href="/auth/register" className="register">
            📝 Register
          </a>
          <a href="/auth/seller-register" className="become-seller">
            🛍️ Become a Seller
          </a>
        </div>
      </header>
      <div className="product-details-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          product && (
            <div>
              <h1 className="product-title">{product.name}</h1>
              <div class="product-image">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="product-info">
                <p className="product-rating">Rating: {product.rating} ★</p>
                <p className="product-price">Price: ${product.price}</p>
                <p className="product-category">Category: {product.category}</p>
                <p className="product-stock">
                  Available Stock: {product.inStockValue}
                </p>
                <button
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <footer className="modern-footer">
        <div className="footer-column">
          <h4>Top Categories</h4>
          <div className="footer-row">
            <a href="#">Men's Wear</a>
          </div>
          <div className="footer-row">
            <a href="#">Women's Wear</a>
          </div>
          <div className="footer-row">
            <a href="#">Kid's Wear</a>
          </div>
        </div>

        <div className="footer-column">
          <h4>About Mytalorzone</h4>
          <div className="footer-row">
            <a href="#">Company Info</a>
          </div>
          <div className="footer-row">
            <a href="#">About Us</a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Help & Contact</h4>
          <div className="footer-row">
            <a href="#">Seller Information Center</a>
          </div>
          <div className="footer-row">
            <a href="#">Contact Us</a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Community</h4>
          <div className="footer-row">
            <a href="#">Announcements</a>
          </div>
          <div className="footer-row">
            <a href="#">Discussion Boards</a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Connect With Us</h4>
          <div className="footer-row">
            <a href="#">
              <i className="fa-brands fa-facebook"></i> Facebook
            </a>
          </div>
          <div className="footer-row">
            <a href="#">
              <i className="fa-brands fa-twitter"></i> Twitter
            </a>
          </div>
          <div className="footer-row">
            <a href="#">
              <i className="fa-brands fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ProductDetails;
