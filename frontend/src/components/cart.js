import React, { useEffect, useState } from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('User not logged in');
          alert('Please log in to view your cart');
          navigate('/auth/login');
          return;
        }

        const response = await fetch('https://ecommercebackend-02c1173a604e.herokuapp.com/get-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setCart(data.cart);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Error fetching cart');
      }
    };

    fetchCart();
  }, [navigate]);

  const handleQuantityChange = async (productId, operation) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('https://ecommercebackend-02c1173a604e.herokuapp.com/cart/update-quantity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, operation }),
      });

      const data = await response.json();
      if (response.ok) {
        setCart(data.cart);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error updating quantity');
    }
  };

  const handleDelete = async (productId) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('https://ecommercebackend-02c1173a604e.herokuapp.com/cart/delete-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId }),
      });

      const data = await response.json();
      if (response.ok) {
        setCart(data.cart);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error deleting item');
    }
  };

  return (
    <div className="cart-container">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        cart && (
          <div>
            <h1>Your Cart</h1>
            <ul className="cart-items">
              {cart.productsInCart.map((product, index) => (
                <li key={index} className="cart-item">
                  <div className="cart-item-image">
                    <img src={product.img} alt={product.name} />
                  </div>
                  <div className="cart-item-details">
                    <h2>{product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <p>
                      Quantity: 
                      <span className="quantity-control">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(product.id, 'decrease')}
                        >
                          -
                        </button>
                        {product.quantity}
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(product.id, 'increase')}
                        >
                          +
                        </button>
                      </span>
                    </p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default Cart;
