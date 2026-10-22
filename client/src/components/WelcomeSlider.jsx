import { useState, useEffect, useRef } from "react";

export default function WelcomeSlider({ media }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) setCurrentIndex((prev) => (prev + 1) % media.length);
    if (diff < -50) setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-play functionality
  useEffect(() => {
    const currentMedia = media[currentIndex];
    const duration = currentMedia.type === "video" ? 10000 : 5000;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, duration);

    return () => clearInterval(timer);
  }, [currentIndex, media]);

  // Play/Pause videos based on active slide
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().catch((e) => console.log("Auto-play blocked:", e));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex]);

  return (
    <div
      className="welcome-slider-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {media.map((item, index) => {
        if (item.type === "video") {
          return (
            <video
              key={index}
              ref={(el) => (videoRefs.current[index] = el)}
              src={item.src}
              muted
              loop
              playsInline
              className={`welcome-slide ${index === currentIndex ? "active" : ""}`}
            />
          );
        }
        return (
          <img
            key={index}
            src={item.src}
            alt={`Zimu's Corner view ${index + 1}`}
            className={`welcome-slide ${index === currentIndex ? "active" : ""}`}
          />
        );
      })}

      {/* Navigation Dots */}
      <div className="welcome-slider-dots">
        {media.map((_, index) => (
          <button
            key={index}
            className={`welcome-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}