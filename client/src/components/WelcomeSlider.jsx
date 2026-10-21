import { useState, useEffect, useRef } from "react";

export default function WelcomeSlider({ media }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  // Auto-play functionality
  useEffect(() => {
    const currentMedia = media[currentIndex];
    // Give videos a bit more time (10s) than images (5s)
    const duration = currentMedia.type === "video" ? 10000 : 5000;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, duration);

    return () => clearInterval(timer);
  }, [currentIndex, media]);

  // Play/Pause videos based on whether they are the active slide
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          // Play the active video
          video.play().catch((e) => console.log("Auto-play blocked:", e));
        } else {
          // Pause and reset inactive videos
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex]);

  return (
    <div className="welcome-slider-container">
      {media.map((item, index) => {
        // If the item is a video
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
        // If the item is an image
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