import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = ({ cartCount, wishlistCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">StyleSync</Link>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li><Link to="/SignupPage" onClick={() => setIsOpen(false)}>Signup</Link></li>
          <li><Link to="/LoginForm" onClick={() => setIsOpen(false)}>Login</Link></li>

          {/* Cart & Wishlist Icons */}
          <li className="cart-icon">
            <Link to="/cart"> Cart
              🛒 <span className="cart-count">{cartCount}</span>
            </Link>
          </li>
          <li className="wishlist-icon">
            <Link to="/wishlist"> Wishlist
              ❤️ <span className="wishlist-count">{wishlistCount}</span>
            </Link>
          </li>
        </ul>

        {/* Hamburger Menu (Mobile) */}
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
