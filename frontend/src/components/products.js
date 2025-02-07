/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "../index.css";

const Products = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [error, setError] = useState(""); // State to track error

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://ecommercebackend-02c1173a604e.herokuapp.com/get-product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.success) {
          setProducts(data.products); // Set the fetched products
        } else {
          setError(data.message); // Set error if response fails
        }
      } catch (error) {
        setError("Failed to fetch products.");
      } 
    };

    fetchProducts();
  }, []);


  return (
    <div>
      {/* Header */}
      <header className="modern">
        <div className="logo">Aura Store</div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/#products">Categories</a>
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

      {/* Hero Section */}
      <section id="heroin"></section>

      {/* Products Section */}
      <section id="product">
        <h2>Our Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="products-card">
              <div className="products-image">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="products-info">
                <h3>{product.name}</h3>
                <p className="product-rating">Rating: {product.rating}</p>
                <p className="product-price">Price: ${product.price}</p>
                <p className="product-stock">Available: {product.inStockValue}</p>
                <p className="product-sold">Sold: {product.soldStockValue}</p>
                <button className="add-to-cart" onClick={() => addToCart(product.id)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
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
              <i className="fab fa-facebook"></i> Facebook
            </a>
          </div>
          <div className="footer-row">
            <a href="#">
              <i className="fab fa-twitter"></i> Twitter
            </a>
          </div>
          <div className="footer-row">
            <a href="#">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );

  // Function to handle "Add to Cart" action
  function addToCart(productId) {
    console.log(`Product ${productId} added to cart.`);
  }
};

export default Products;
