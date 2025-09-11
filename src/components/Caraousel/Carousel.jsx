import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledItems, setShuffledItems] = useState([...items]);

  useEffect(() => {
    setShuffledItems([...items]);
  }, [items]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % shuffledItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + shuffledItems.length) % shuffledItems.length);
  };

  const firstSlide = () => {
    setCurrentIndex(0);
  };

  const lastSlide = () => {
    setCurrentIndex(shuffledItems.length - 1);
  };

  const shuffleSlides = () => {
    let shuffled = [...shuffledItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledItems(shuffled);
    setCurrentIndex(0);
  };

  return (
    <div className="carousel">
      <div className="carousel-content">
        <div className="carousel-slide">
          {shuffledItems[currentIndex]}
        </div>

        {/* Left arrow (hidden on first slide) */}
        {currentIndex > 0 && (
          <button className="carousel-arrow left" onClick={prevSlide}>
            &#10094;
          </button>
        )}

        {/* Right arrow (hidden on last slide) */}
        {currentIndex < shuffledItems.length - 1 && (
          <button className="carousel-arrow right" onClick={nextSlide}>
            &#10095;
          </button>
        )}
      </div>

      <div className="carousel-buttons">
        <button onClick={firstSlide}>First</button>
        <button onClick={shuffleSlides}>Shuffle</button>
        <button onClick={lastSlide}>Last</button>
      </div>
    </div>
  );
};

export default Carousel;
