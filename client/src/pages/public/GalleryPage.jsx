import { images } from "../../assets/imageImports";
import Reveal from "../../components/Reveal";

export default function GalleryPage() {
  // Create an array of the new pics for easy mapping
  const galleryImages = [
    { src: images.pic1, alt: "Zimu's Corner Gallery 1" },
    { src: images.pic2, alt: "Zimu's Corner Gallery 2" },
    { src: images.pic3, alt: "Zimu's Corner Gallery 3" },
    { src: images.pic4, alt: "Zimu's Corner Gallery 4" },
    { src: images.pic5, alt: "Zimu's Corner Gallery 5" },
    { src: images.pic6, alt: "Zimu's Corner Gallery 6" },
    { src: images.pic7, alt: "Zimu's Corner Gallery 7" },
    { src: images.pic8, alt: "Zimu's Corner Gallery 8" },
    { src: images.pic9, alt: "Zimu's Corner Gallery 9" },
    { src: images.pic10, alt: "Zimu's Corner Gallery 10" },
    { src: images.pic11, alt: "Zimu's Corner Gallery 11" },
    { src: images.pic12, alt: "Zimu's Corner Gallery 12" },
    { src: images.pic13, alt: "Zimu's Corner Gallery 13" },
  ];

  return (
    <section className="container" style={{ padding: "6rem 0", background: "var(--ivory)" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p style={{ color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600 }}>
          Gallery
        </p>
        <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: "var(--forest)", marginTop: "1rem" }}>
          Life at Zimu's Corner
        </h1>
        <p style={{ maxWidth: "600px", margin: "1rem auto 0", opacity: 0.8 }}>
          Take a visual journey through our pools, gardens, events, and accommodation.
        </p>
      </div>

      {/* Responsive Masonry-Style Grid */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "1.5rem" 
        }}
      >
        {galleryImages.map((img, index) => (
          <Reveal key={index} delay={(index % 4) * 100}>
            <div 
              style={{ 
                borderRadius: "16px", 
                overflow: "hidden", 
                boxShadow: "0 10px 30px -10px rgba(16,26,23,0.15)",
                height: "100%",
                aspectRatio: "4/3" // Keeps all images perfectly uniform
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  display: "block", 
                  transition: "transform 0.5s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}