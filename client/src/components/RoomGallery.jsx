import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RoomGallery({ images, roomName }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="room-image">
      <img
        src={images[currentIndex]}
        alt={`${roomName} - Image ${currentIndex + 1}`}
      />

      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        style={{ position: "absolute", left: "0.5rem", top: "45%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
        aria-label="Previous image"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={nextImage}
        style={{ position: "absolute", right: "0.5rem", top: "45%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
        aria-label="Next image"
      >
        <ChevronRight size={18} />
      </button>

      {/* Thumbnails Overlay (Top Right) */}
      <div className="room-thumbnails">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.preventDefault(); setCurrentIndex(idx); }}
            className={`room-thumb ${idx === currentIndex ? "active" : ""}`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}