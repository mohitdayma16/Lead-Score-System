import Card from "./Card";
import './Parlour.css'

function Parlour({ parlour, removeParlour, addToCart, addToWishlist, removeFromWishlist, wishlist }) {
  return (
    <div>
      <h1>StyleSync</h1>

      <div className="parlour-container">
        {parlour.map((p) => (
          <Card 
            key={p.id} 
            {...p} 
            removeParlour={removeParlour} 
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            isWishlisted={wishlist.some((w) => w.id === p.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Parlour;
