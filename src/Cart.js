import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart({ cart, removeFromCart }) {
  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty. <Link to="/">Continue Shopping</Link></p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price}</p>
                </div>
                <button className="remove-cart-bttn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Checkout Button */}
          <button className="checkout-btn">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
