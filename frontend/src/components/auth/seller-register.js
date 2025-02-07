import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./seller-register.css";

const SellerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    emailId: "",
    password: "",
    name: "",
    businessName: "",
    businessAddress: "",
    businessType: "",
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
      const response = await fetch("https://ecommercebackend-02c1173a604e.herokuapp.com/adminauth/seller/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/seller-login"); // Redirect to login page
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error registering seller:", error);
      alert("Error registering seller");
    }
  };

  return (
    
    <div className="signup-container">
      <h2 className="signup-title">Seller Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          className="signup-input"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="signup-input"
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          className="signup-input"
          type="email"
          name="emailId"
          placeholder="Email"
          value={formData.emailId}
          onChange={handleChange}
          required
        />
        <input
          className="signup-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          className="signup-input"
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={formData.businessName}
          onChange={handleChange}
          required
        />
        <input
          className="signup-input"
          type="text"
          name="businessAddress"
          placeholder="Business Address"
          value={formData.businessAddress}
          onChange={handleChange}
          required
        />
        <select
          className="signup-input"
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Business Type
          </option>
          <option value="Retail">Retail</option>
          <option value="Wholesale">Wholesale</option>
          <option value="Services">Services</option>
        </select>
        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
      <div className="additional-links">
        <button onClick={() => window.location.href = '/auth/seller-login'} className="additional-btn">Already Registered? Login</button>
      </div>
    </div>
     
  );
};

export default SellerSignup;
