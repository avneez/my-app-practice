import { useState } from "react";
import "./flippingCard.css";

const FlippingCard = () => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin:'auto', marginTop: '20px' }}
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="card-inner">
        <div className="card-front">
          <h2>Card Title</h2>
          <p>Click to see offer!</p>
        </div>
        <div className="card-back">
          <h2>Special Offer</h2>
          <p>Get 50% off!</p>
        </div>
      </div>
    </div>
  );
};

export default FlippingCard;
