import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Parlour from "./Parlour";
import Contact from "./Contact";
import SignupPage from "./SignupPage";
import LoginForm from "./LoginForm";
import Data from "./Data";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import Form from "./Form";
import "./App.css";

function App() {
  const [parlour, setParlour] = useState(Data);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  function removeParlour(id) {
    setParlour(parlour.filter((p) => p.id !== id));
  }

  function addToCart(item) {
    setCart([...cart, item]);
  }

  function addToWishlist(item) {
    if (!wishlist.some((w) => w.id === item.id)) {
      setWishlist([...wishlist, item]);
    }
  }

  function removeFromWishlist(id) {
    setWishlist(wishlist.filter((w) => w.id !== id));
  }

  return (
    <div>
      {/* Navbar with Cart & Wishlist Counts */}
      <Navbar cartCount={cart.length} wishlistCount={wishlist.length} />

      <Routes>
        <Route
          path="/"
          element={
            <Parlour
              parlour={parlour}
              removeParlour={removeParlour}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              wishlist={wishlist}
            />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />} />
      </Routes>

      {parlour.length === 0 ? (
        <div className="refresh">
          <h1>NO FACILITY LEFT</h1>
          <button onClick={() => setParlour(Data)}>Refresh</button>
        </div>
      ) : (
        <Form />
      )}
    </div>
  );
}

export default App;
