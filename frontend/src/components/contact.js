/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../index.css"; 

const Contact = () => {
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

      <section id="contact">
        <h2 className="contact-heading">Contact Us</h2>
        <p className="contact-description">
          We'd love to hear from you! Fill out the form below and we’ll get back to you as soon as possible.
        </p>
        <form action="#" method="post" className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
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
          <div className="footer-row">
            <a href="#"><i className="fab fa-facebook"></i> Facebook</a>
          </div>
          <div className="footer-row">
            <a href="#"><i className="fab fa-twitter"></i> Twitter</a>
          </div>
          <div className="footer-row">
            <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
