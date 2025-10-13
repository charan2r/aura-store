import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const SellerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sellerId: "",
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/seller-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in");
    }
  };

  return (
    <div className="center-container">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Seller Login</h2>
          <input
            type="text"
            name="sellerId"
            placeholder="Seller ID"
            value={formData.sellerId}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or Phone"
            value={formData.emailOrPhone}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
