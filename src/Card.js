import { useState } from "react";
import './Card.css';

function Card({ id, name, info, image, price, removeParlour, addToCart, addToWishlist, removeFromWishlist, isWishlisted }) {
  const [readmore, setReadmore] = useState(false);
  
  return (
    <div className="card">
      <img src={image} className="image" alt={name} />
      <div>
        <div className="parlour-details">
          <h4 className="parlour-price">{price}</h4>
          <h4 className="parlour-name">{name}</h4>
        </div>
        <div className="description">
          {readmore ? info : `${info.substring(0, 100)}...`}
          <span className="read-more" onClick={() => setReadmore(!readmore)}>
            {readmore ? `Show less` : `Read more`}
          </span>
        </div>
      </div>
      <button className="red-bttn" onClick={() => removeParlour(id)}>
        Not Interested
      </button>
      <button className="cart-bttn" onClick={() => addToCart({ id, name, price, image })}>
        Add to Cart
      </button>
      <button className={`wishlist-bttn ${isWishlisted ? 'active' : ''}`} 
        onClick={() => isWishlisted ? removeFromWishlist(id) : addToWishlist({ id, name, price, image })}>
        {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  );
}

export default Card;
