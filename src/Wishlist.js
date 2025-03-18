import React from "react";
import "./Wishlist.css";

function Wishlist({ wishlist, removeFromWishlist }) {
  return (
    <div>
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <h2>No items in wishlist</h2>
      ) : (
        <div className="wishlist-container">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
