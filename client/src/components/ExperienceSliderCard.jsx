import { useState, useEffect } from "react";
import { images } from "../assets/imageImports";

export default function ExperienceSliderCard({ imageKeys }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageKeys.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [imageKeys.length]);

  return (
    <div className="exp-clean-slider">
      {imageKeys.map((imgKey, index) => (
        <img
          key={index}
          src={images[imgKey]}
          alt={`Experience view ${index + 1}`}
          className={`exp-clean-slide ${index === currentIndex ? "active" : ""}`}
        />
      ))}

      {/* Navigation Dots */}
      <div className="exp-clean-dots">
        {imageKeys.map((_, index) => (
          <button
            key={index}
            className={`exp-clean-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}