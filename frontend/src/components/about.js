/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../index.css"; 

const About = () => {
  return (
    <div>
      <header className="modern">
        <div className="logo">Aura Store</div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/home#products">Categories</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <div className="cart">🛒</div>
        <div className="auth-links">
          <a href="#login" className="login">🔑 Login</a>
          <a href="#register" className="register">📝 Register</a>
        </div>
      </header>

      <section id="about" className="about-section">
        <div className="about-container">
          <h2 className="about-heading">About Us</h2>
          <p className="about-text">
            Welcome to <strong>Mytalorzone By Sahiba</strong>, your one-stop shop for exquisite clothing. We are dedicated to providing you with the best quality products, with a focus on dependability, customer service, and uniqueness.
          </p>
          <p className="about-text">
            <strong>Mytalorzone By Sahiba</strong> is a clothing brand that offers creative, unique, and diverse clothing for girls, including traditional, western, and trendy styles.
          </p>
          <p className="about-text">
            Founded in 2015 by Sahiba, <strong>Mytalorzone</strong> has come a long way from its beginnings. When Sahiba first started out, her passion for fashion and design drove her to start her own business.
          </p>
          <p className="about-text">
            We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
          </p>
          <p className="about-signature">
            Sincerely,<br />
            <strong>Sahiba</strong>
          </p>
        </div>
      </section>

      <footer className="modern-footer">
        <div className="footer-column">
          <h4>Top Categories</h4>
          <div className="footer-row"><a href="#">Men's Wear</a></div>
          <div className="footer-row"><a href="#">Women's Wear</a></div>
          <div className="footer-row"><a href="#">Kid's Wear</a></div>
        </div>

        <div className="footer-column">
          <h4>About Mytalorzone</h4>
          <div className="footer-row"><a href="#">Company Info</a></div>
          <div className="footer-row"><a href="#">About Us</a></div>
        </div>

        <div className="footer-column">
          <h4>Help & Contact</h4>
          <div className="footer-row"><a href="#">Seller Information Center</a></div>
          <div className="footer-row"><a href="#">Contact Us</a></div>
        </div>

        <div className="footer-column">
          <h4>Community</h4>
          <div className="footer-row"><a href="#">Announcements</a></div>
          <div className="footer-row"><a href="#">Discussion Boards</a></div>
        </div>

        <div className="footer-column">
          <h4>Connect With Us</h4>
          <div className="footer-row"><a href="#"><i className="fab fa-facebook"></i> Facebook</a></div>
          <div className="footer-row"><a href="#"><i className="fab fa-twitter"></i> Twitter</a></div>
          <div className="footer-row"><a href="#"><i className="fab fa-instagram"></i> Instagram</a></div>
        </div>
      </footer>
    </div>
  );
};

export default About;
