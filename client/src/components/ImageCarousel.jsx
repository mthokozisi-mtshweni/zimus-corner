import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCarousel({ images, title, description, onEnquire }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset to first image if the image array changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Thumbnail Row (Moved to TOP, Rounded Corners) */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "80px",
              height: "60px",
              padding: 0,
              border: index === currentIndex ? "2px solid var(--gold)" : "2px solid transparent",
              borderRadius: "12px", // Added rounded corners to thumbnails
              overflow: "hidden",
              cursor: "pointer",
              transition: "filter 0.3s ease, border 0.3s ease",
              filter: index === currentIndex ? "none" : "blur(2px) brightness(0.7)", // Blurring effect
              background: "none",
            }}
          >
            <img
              src={img.src}
              alt={`Thumbnail ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </button>
        ))}
      </div>

      {/* Main Image Display */}
      <div
        style={{
          position: "relative",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          boxShadow: "var(--shadow-soft)",
          aspectRatio: "16 / 9", // Keeps a consistent cinematic shape
        }}
      >
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt || title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          aria-label="Previous image"
          style={{
            position: "absolute",
            top: "50%",
            left: "1rem",
            transform: "translateY(-50%)",
            background: "rgba(16,26,23,0.7)",
            color: "var(--white)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(4px)",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(16,26,23,0.9)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(16,26,23,0.7)")}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextImage}
          aria-label="Next image"
          style={{
            position: "absolute",
            top: "50%",
            right: "1rem",
            transform: "translateY(-50%)",
            background: "rgba(16,26,23,0.7)",
            color: "var(--white)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(4px)",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(16,26,23,0.9)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(16,26,23,0.7)")}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Text Content */}
      <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <h3 style={{ fontSize: "1.5rem", color: "var(--forest)", marginBottom: "0.5rem" }}>
          {title}
        </h3>
        <p style={{ opacity: 0.8, lineHeight: 1.6, marginBottom: "1.5rem" }}>
          {description}
        </p>
        <button
          onClick={onEnquire}
          style={{
            background: "var(--forest)",
            color: "var(--ivory)",
            padding: "0.75rem 2rem",
            borderRadius: "var(--radius-sm)",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Enquire for Availability
        </button>
      </div>
    </div>
  );
}