/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import "../index.css";

const Home = () => {
  const navigate = useNavigate();

  // Fetch products by categories on component mount
  useEffect(() => {
    fetchProductsByCategories();
  }, []);

  const fetchProductsByCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/product/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), 
      });

      const data = await response.json();
      if (data.success) {
        displayProductsByCategories(data.productsByCategory);
      } else {
        console.log("Error getting products", data.message);
      }
    } catch (error) {
      console.log("Error getting products", error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const userId = localStorage.getItem('userId'); 
      const quantity = 1; 

      const response = await fetch("http://localhost:5000/addtocart", {
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

  const handleProductClick = (productId) => {
    navigate(`/${productId}`);
  };

  // Display products by categories
  const displayProductsByCategories = (productsByCategory) => {
    const productsContainer = document.querySelector(".product-grid");
    if (productsContainer) {
      productsContainer.innerHTML = ""; 

      for (const [category, products] of Object.entries(productsByCategory)) {
        const categorySection = document.createElement("div");
        categorySection.classList.add("category-section");

        const categoryTitle = document.createElement("h3");
        categoryTitle.textContent = category;
        categoryTitle.classList.add("category-title");
        categorySection.appendChild(categoryTitle);

        const categoryProductsContainer = document.createElement("div");
        categoryProductsContainer.classList.add("category-products");

        products.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");
          productCard.innerHTML = `
            <div class="product-image">
                <img src="/images/${product.img}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-rating">Rating: ${product.rating}</p>
                <p class="product-price">Price: $${product.price}</p>
                <p class="product-stock">Available: ${product.inStockValue}</p>
                <p class="product-sold">Sold: ${product.soldStockValue}</p>
                <button class="add-to-cart" >Add to cart</button>
            </div>`;
            productCard.querySelector('.add-to-cart').addEventListener('click', (e) => {
              e.stopPropagation();
              handleAddToCart(product.productId);
            });
          productCard.addEventListener('click', () => handleProductClick(product.productId));
          categoryProductsContainer.appendChild(productCard);
        });

        categorySection.appendChild(categoryProductsContainer);
        productsContainer.appendChild(categorySection);
      }
    }
  };


  return (
    <div>
      {/* Header Section */}
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
        <div className="cart"><a href="/cart">🛒</a></div>
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
      <section id="hero">
        <h1>Welcome to Aura Store</h1>
        <p>Discover the latest trends in fashion with our curated collection of clothing and accessories.</p>
        <a href="#products" className="cta-button">Shop Now</a>
      </section>

      {/* Products Section */}
      <section id="products">
        <h2>Our Categories</h2>
        <div className="product-grid"></div>
      </section>

      {/* Footer Section */}
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
          <h4>About Us</h4>
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
    </div>
  );
};

export default Home;
