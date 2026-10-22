import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, MapPin, BedDouble, Sparkles, Music,
  Waves, Flame, Castle, Play, Leaf, Calendar, Droplets, ArrowUp,
  Users, Smile, Package, Phone, Mail, Quote, Check, Star,
  ChevronDown, X, Heart
} from "lucide-react";
import { images } from "../../assets/imageImports";
import {
  resortInfo, dayVisitPricing, includedFacilities, experiences,
  galleryImages, guestReviews, roomTypes, homeExperiences
} from "../../constants/siteData";
import Reveal from "../../components/Reveal";
import ImageCarousel from "../../components/ImageCarousel";
import RoomGallery from "../../components/RoomGallery";
import WelcomeSlider from "../../components/WelcomeSlider";
import { fetchRooms, fetchEvents } from "../../services/api";
import "../../styles/rooms.css";
import "../../styles/home.css";

const iconMap = {
  waves: Waves, droplets: Droplets, flame: Flame, castle: Castle,
  up: ArrowUp, play: Play, music: Music, sparkles: Sparkles, leaf: Leaf, calendar: Calendar,
};

export default function HomePage() {
      const [homeEvents, setHomeEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then(data => setHomeEvents(data.slice(0, 3))) // Get the first 3 events
      .catch(err => console.error("Failed to load events:", err));
  }, []);

  const [homeRooms, setHomeRooms] = useState([]);

    // Contact modal state
  const [contactModalOpen, setContactModalOpen] = useState(false);


    const expCardRefs = useRef([]);

  // Mobile: play only the video that's centered in the viewport
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!isMobile || !homeExperiences?.length) return;

    const observers = [];

    expCardRefs.current.forEach((el) => {
      if (!el) return;
      const video = el.querySelector("video");
      if (!video || !video.src) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Play THIS video, mark card as in-view
            video.play().catch(() => {});
            el.classList.add("in-view");
          } else {
            // Pause and reset
            video.pause();
            video.currentTime = 0;
            el.classList.remove("in-view");
          }
        },
        {
          root: null,
          // Only trigger when card is within the middle 20% of viewport
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [homeExperiences]);

  // Escape key handler to close the modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setContactModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (contactModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [contactModalOpen]);

  useEffect(() => {
    // Fetch rooms from the database and grab the first 3
    fetchRooms()
      .then(data => setHomeRooms(data.slice(0, 3)))
      .catch(err => console.error("Failed to load rooms:", err));
  }, []);

  // ... rest of the component


  return (
    <>
           
            {/* HERO WITH CINEMATIC VIDEO */}
      <section className="hero" id="home">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hero-video"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />

        <div className="hero-content">
          <span className="hero-kicker">
            <span className="kicker-line" /> MPUMALANGA · SOUTH AFRICA
          </span>
          <h1>
            Welcome to <br /><em>Zimu's Corner Resort.</em>
          </h1>
          <p>
           A place to unwind, enjoy the moment, and create unforgettable memories.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="button button-gold">
              Enquire About Your Stay <ArrowRight size={17} />
            </Link>
            <button
                className="hero-text-link"
                type="button"
                onClick={() => setContactModalOpen(true)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
                >
                Contact Us <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="hero-bottom">
          <span>YOUR ESCAPE · YOUR VIBE</span>
          <a href="#welcome" aria-label="Scroll to discover">
            SCROLL TO DISCOVER <ChevronDown size={15} />
          </a>
        </div>
      </section>

      {/* WELCOME / RESORT INTRODUCTION */}
      <section className="welcome-section" id="welcome">
        <div className="container">
          <div className="welcome-grid">
            
            {/* Text Content */}
            <Reveal direction="left">
              <div>
                <p className="welcome-eyebrow">
                  Welcome to Zimu's Corner
                </p>
                <h2 className="welcome-heading">
                  A vibrant escape in the heart of <em>Mpumalanga.</em>
                </h2>
                <p className="welcome-text">
                  Nestled in Tweefontein, Zimu’s Corner Lifestyle Resort is a premier family-friendly destination. Whether you are seeking a refreshing weekend getaway, a lively venue for celebrations, or a relaxing day by the pool, our resort blends natural charm with vibrant entertainment.
                </p>
                <p className="welcome-text">
                  Discover multiple swimming pools, lush gardens, and exceptional hospitality designed for unforgettable moments with friends and family.
                </p>
                <Link to="/resort" className="welcome-link">
                  Discover the full resort <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>

                        {/* Image Content */}
            <Reveal direction="right" delay={200}>
              <div className="welcome-image-wrapper">
                <div className="welcome-image-border" />
                <WelcomeSlider 
                  media={[
                    { type: "image", src: images.garden1 },
                    { type: "video", src: "/hero-video.mp4" }, // Reusing your hero video for this demo
                    { type: "image", src: images.realRoom2 },
                    { type: "image", src: images.pool2 },
                    { type: "video", src: "/video1.mp4" },
                    { type: "image", src: images.pic11 },
                    { type: "image", src: images.pic6 },
                    { type: "image", src: images.pic12 },
                    { type: "image", src: images.pic8 },
                    { type: "video", src: "/eventVideo.mp4" },
                  ]} 
                />
              </div>
            </Reveal>

          </div>
        </div>
      </section>




            {/* DAY VISIT PRICING */}
      <section className="section-pad" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600 }}>
                Day Visits
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--forest)" }}>
                Simple, <em style={{ fontStyle: "italic", color: "var(--gold)" }}>transparent</em> pricing
              </h2>
              <p style={{ maxWidth: "600px", margin: "1rem auto 0", opacity: 0.8 }}>
                No hidden fees. Just pay for your entry and enjoy everything Zimu's Corner has to offer.
              </p>
            </div>
          </Reveal>

          {/* Pricing Cards */}
          <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", marginBottom: "3rem" }}>
            {dayVisitPricing.map((item, index) => {
              // Map the icon string to the actual component
              const IconComponent = 
                item.icon === "users" ? Users : 
                item.icon === "smile" ? Smile : Package;

              return (
                <Reveal key={item.label} delay={index * 150}>
                  <div
                    style={{
                      background: "var(--white)",
                      borderRadius: "16px",
                      padding: "3rem 1.5rem",
                      textAlign: "center",
                      boxShadow: "0 15px 35px -15px rgba(16,26,23,0.1)",
                      border: "1px solid rgba(217,164,65,0.15)",
                      position: "relative",
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.transform = "translateY(-8px)"; 
                      e.currentTarget.style.boxShadow = "0 25px 50px -15px rgba(16,26,23,0.15)"; 
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.transform = "translateY(0)"; 
                      e.currentTarget.style.boxShadow = "0 15px 35px -15px rgba(16,26,23,0.1)"; 
                    }}
                  >
                    {/* Top Gold Accent Bar */}
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "var(--gold)" }} />

                    {/* Icon */}
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "50%", background: "rgba(217,164,65,0.1)", marginBottom: "1.5rem" }}>
                      <IconComponent size={28} color="var(--forest)" />
                    </div>

                    <p style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.6, fontWeight: 700, marginBottom: "0.5rem" }}>
                      {item.label}
                    </p>
                    
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", color: "var(--forest)", margin: "0 0 0.5rem", lineHeight: 1 }}>
                      {item.price}
                    </p>
                    
                    <p style={{ fontSize: "0.9rem", color: "#666", fontWeight: 500 }}>
                      {item.note}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* What's Included Banner
          <Reveal delay={300}>
            <div 
              style={{ 
                background: "var(--forest)", 
                borderRadius: "16px", 
                padding: "2rem", 
                display: "flex", 
                flexWrap: "wrap", 
                alignItems: "center", 
                justifyContent: "space-between",
                gap: "1.5rem",
                color: "var(--ivory)"
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.2rem", margin: 0, color: "var(--gold)" }}>Included with every entry</h3>
                <p style={{ margin: "0.25rem 0 0", opacity: 0.8, fontSize: "0.9rem" }}>No extra charges for standard amenities.</p>
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", fontWeight: 500 }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Waves size={16} color="var(--gold)"/> Pools</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Flame size={16} color="var(--gold)"/> Braai Areas</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Castle size={16} color="var(--gold)"/> Jumping Castle</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Music size={16} color="var(--gold)"/> Music</span>
              </div>
            </div>
          </Reveal>
           */}
        </div>
      </section>


      {/* INCLUDED FACILITIES */}
      <section className="section-pad" style={{ background: "var(--forest)", color: "var(--ivory)" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem" }}>
                Included With Entry
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>Everything for a great day out</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            {includedFacilities.map((facility, index) => {
              const Icon = iconMap[facility.icon] || Sparkles;
              return (
                <Reveal key={facility.name} delay={index * 50}>
                  <div
                    style={{
                      background: "rgba(245,240,231,0.06)",
                      borderRadius: "var(--radius-md)",
                      padding: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      border: "1px solid rgba(217,164,65,0.1)",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(245,240,231,0.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(245,240,231,0.06)"}
                  >
                    <Icon size={24} color="var(--gold)" />
                    <span style={{ fontSize: "1rem" }}>{facility.name}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
            {/* EXPERIENCES PREVIEW (HOVER VIDEOS) */}
      <section className="home-exp-section">
        <div className="container">
          <Reveal>
            <div className="home-exp-header">
              <p style={{ color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600 }}>
                Discover
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--forest)", margin: 0 }}>
                The Zimu's Corner Experience
              </h2>
            </div>
          </Reveal>

          <div className="home-exp-grid">
            {homeExperiences && homeExperiences.map((exp, index) => (
              <Reveal key={exp.title} delay={index * 150}>
                <Link
                  ref={(el) => (expCardRefs.current[index] = el)}
                  to={exp.title.includes("Rooms") ? "/rooms" : exp.title.includes("Events") ? "/events" : "/contact"}
                  className="home-exp-card"
                  onMouseEnter={(e) => {
                    // Desktop hover: play this video
                    const video = e.currentTarget.querySelector("video");
                    if (video && video.src) video.play().catch(() => {});
                  }}
                  onMouseLeave={(e) => {
                    // Desktop hover end: pause
                    const video = e.currentTarget.querySelector("video");
                    if (video) {
                      video.pause();
                      video.currentTime = 0;
                    }
                  }}
                >
                  {/* MEDIA (Image & Video) */}
                  <div className="home-exp-media">
                    <img src={images[exp.imageKey]} alt={exp.title} />
                    {exp.videoUrl && (
                      <video
                        src={exp.videoUrl}
                        muted
                        loop
                        playsInline
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="home-exp-overlay"></div>

                  {/* Content */}
                  <div className="home-exp-content">
                    <span className="home-exp-tag">{exp.tag}</span>
                    <h3>{exp.title}</h3>
                    <p>{exp.description}</p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="home-exp-icon">
                    <ArrowRight size={20} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

            {/* ACCOMMODATION PREVIEW (Lesiba Style) */}
      <section className="rooms-section" id="rooms">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem" }}>
                Rooms & Rates
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--forest)" }}>
                Choose your <em style={{ fontStyle: "italic", color: "var(--gold)" }}>comfort.</em>
              </h2>
              <p style={{ maxWidth: "600px", margin: "1rem auto 0", opacity: 0.8 }}>
                Overnight stays and weekend getaways are available. Room details and final rates are currently being verified.
              </p>
            </div>
          </Reveal>

                                    <div className="rooms-grid">
            {homeRooms.length === 0 ? (
              <div style={{ textAlign: "center", width: "100%", padding: "2rem", opacity: 0.5 }}>
                Loading rooms...
              </div>
            ) : (
              homeRooms.map((room, index) => {
                // Map the database image strings to your real images
                const roomImages = room.imageKeys.map(imgKey => images[imgKey]);
                // Use default features for the homepage cards
                const displayFeatures = ["Access to Pools", "Braai Area", "Free Parking", "Wifi"];

                return (
                  <Reveal key={room.slug} delay={index * 150}>
                    <article className="room-card">
                      
                      <RoomGallery images={roomImages} roomName={room.name} />
                      
                      <span className="room-tag">
                        <Star size={12} /> Available
                      </span>

                      <div className="room-body">
                        <div className="room-header">
                          <h3>{room.name}</h3>
                          <div className="room-price">
                            {/* Convert cents to Rands */}
                            <strong>R{(room.price / 100).toLocaleString()}</strong>
                            <small>per night</small>
                          </div>
                        </div>
                        <ul className="room-features">
                          {displayFeatures.map((f) => (
                            <li key={f}>
                              <Check size={16} /> {f}
                            </li>
                          ))}
                        </ul>
                        
                        <Link to={`/rooms/${room.slug}`} className="room-cta">
                          View Details & Book <ArrowRight size={16} />
                        </Link>
                        
                      </div>
                    </article>
                  </Reveal>
                );
              })
            )}
          </div>
          {/* <p className="rooms-note">
            * Rates are indicative. Please confirm availability and final pricing directly with the resort.
          </p> */}
        </div>
      </section>

            {/* UPCOMING EVENTS PREVIEW */}
      <section className="events-preview-section">
        <div className="container">
          
          <Reveal>
            <div className="events-preview-header">
              <div>
                <p style={{ color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  What's On
                </p>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--forest)", margin: 0 }}>
                  Upcoming Events
                </h2>
              </div>
              <Link to="/events" className="btn-view-all-events">
                View All Events <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          <div className="events-preview-grid">
            {homeEvents.length === 0 ? (
              <div style={{ textAlign: "center", width: "100%", padding: "2rem", opacity: 0.5 }}>
                Loading events...
              </div>
            ) : (
              homeEvents.map((event, index) => (
                <Reveal key={event.id} delay={index * 150}>
                  <Link to={`/events/${event.id}`} className="event-preview-card">
                    
                    <div className="event-preview-image-wrapper">
                      <img 
                        src={images[event.imageKey]} 
                        alt={event.title} 
                        className="event-preview-image" 
                      />
                      <span className="event-preview-badge">Upcoming</span>
                    </div>

                                       <div className="event-preview-body">
                      <div className="event-preview-date">
                        <Calendar size={16} />
                        <span>{event.date}</span>
                      </div>
                      <h3 className="event-preview-title">{event.title}</h3>
                      <p className="event-preview-desc">{event.description}</p>

                      {/* GET A TICKET BUTTON */}
                      <span className="event-preview-btn">
                        Get a Ticket <ArrowRight size={16} />
                      </span>
                    </div>

                  </Link>
                </Reveal>
              ))
            )}
          </div>

        </div>
      </section>

              {/* MORE THAN A PLACE TO STAY */}
      <section
        className="more-than-section"
        style={{ backgroundImage: `url(${images.pool1})` }}
      >
        <div className="more-than-overlay" />
        <div className="container more-than-content">
          <Reveal>
            <Heart size={23} strokeWidth={1.4} color="var(--gold)" />
            <span className="more-than-eyebrow">MORE THAN A PLACE TO STAY</span>
            <h2>Come as you are.<br /><em>Leave feeling restored.</em></h2>
            <p>Make room for a getaway that feels a little more like you.</p>
          </Reveal>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="section-pad" style={{ background: "var(--forest)", color: "var(--ivory)" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem" }}>
                Gallery
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>A glimpse of Zimu's Corner</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {galleryImages.map((img, index) => (
              <Reveal key={img.key} delay={index * 100}>
                <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                  <img
                    src={images[img.key]}
                    alt={img.alt}
                    style={{ width: "100%", height: "260px", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link
                to="/gallery"
                style={{
                  color: "var(--gold)",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "1.1rem",
                }}
              >
                View full gallery <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

            {/* GUEST REVIEWS */}
      <section className="section-pad" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600 }}>
                Guest Experiences
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--forest)" }}>
                What our visitors are <em style={{ fontStyle: "italic", color: "var(--gold)" }}>saying.</em>
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {guestReviews.map((review, index) => (
              <Reveal key={index} delay={index * 150}>
                <div style={{ 
                  background: "var(--white)", 
                  padding: "2.5rem 2rem", 
                  borderRadius: "16px", 
                  boxShadow: "0 15px 35px -15px rgba(16,26,23,0.08)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%"
                }}>
                  {/* Decorative Quote Icon */}
                  <Quote size={40} color="rgba(217,164,65,0.15)" style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }} />
                  
                  {/* Stars */}
                  <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p style={{ 
                    fontSize: "1rem", 
                    lineHeight: 1.7, 
                    color: "var(--charcoal)", 
                    fontStyle: "italic",
                    flex: 1, // Pushes the author info to the bottom
                    marginBottom: "1.5rem" 
                  }}>
                    "{review.quote}"
                  </p>

                  {/* Author */}
                  <div style={{ borderTop: "1px solid rgba(16,26,23,0.1)", paddingTop: "1rem" }}>
                    <p style={{ fontWeight: 700, color: "var(--forest)", margin: 0, fontSize: "0.95rem" }}>
                      {review.name}
                    </p>
                    <p style={{ fontSize: "0.8rem", opacity: 0.6, margin: 0 }}>
                      {review.location}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

            {/* VISIT INFO - CONTACT & MAP */}
      <section className="section-pad" style={{ background: "var(--white)" }}>
        <div className="container">
          <div style={{ display: "grid", gap: "3rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "stretch" }}>
            
            {/* LEFT: Contact & Social Media */}
            <Reveal direction="left">
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                <p style={{ color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600, marginBottom: "1rem" }}>
                  Visit Us
                </p>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--forest)", marginBottom: "1.5rem", lineHeight: 1.2 }}>
                  Find us in <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Tweefontein</em>
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, opacity: 0.8, marginBottom: "2rem" }}>
                  Zimu’s Corner Lifestyle Resort is easily accessible and ready to welcome you. Reach out to us for directions, group bookings, or any enquiries.
                </p>

                {/* Contact Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <MapPin color="var(--gold)" size={24} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--forest)" }}>Address</h3>
                      <p style={{ opacity: 0.8, margin: 0, fontSize: "0.95rem" }}>Tweefontein, Mpumalanga, South Africa</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <Phone color="var(--gold)" size={24} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--forest)" }}>Phone / WhatsApp</h3>
                      <p style={{ opacity: 0.8, margin: 0, fontSize: "0.95rem", fontStyle: "italic" }}>Contact details pending verification</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <Mail color="var(--gold)" size={24} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--forest)" }}>Email</h3>
                      <p style={{ opacity: 0.8, margin: 0, fontSize: "0.95rem", fontStyle: "italic" }}>Contact details pending verification</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links (Replace # with actual links) */}
                <div style={{ display: "flex", gap: "1rem" }}>
                  <a href="#" aria-label="Facebook" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "50%", background: "var(--forest)", color: "var(--ivory)", transition: "background 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "var(--gold)"} onMouseLeave={(e) => e.currentTarget.style.background = "var(--forest)"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="#" aria-label="Instagram" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "50%", background: "var(--forest)", color: "var(--ivory)", transition: "background 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "var(--gold)"} onMouseLeave={(e) => e.currentTarget.style.background = "var(--forest)"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                  <a href="#" aria-label="TikTok" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "50%", background: "var(--forest)", color: "var(--ivory)", transition: "background 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "var(--gold)"} onMouseLeave={(e) => e.currentTarget.style.background = "var(--forest)"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                  </a>
                </div>
                <p style={{ fontSize: "0.8rem", opacity: 0.6, marginTop: "1rem", fontStyle: "italic" }}>
                  * Social media links will be activated once verified by the owner.
                </p>
              </div>
            </Reveal>

            {/* RIGHT: Real Google Map */}
            <Reveal direction="right" delay={200}>
              <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px -20px rgba(16,26,23,0.2)", height: "100%", minHeight: "400px", background: "#e5e3df" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14454.857735615312!2d28.91600435!3d-25.1332615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9f9a6b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sTweefontein%2C%20Mpumalanga%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Zimu's Corner Lifestyle Resort Location"
                ></iframe>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

            {/* CONTACT MODAL */}
      {contactModalOpen && (
        <div
          className="contact-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Contact Zimu's Corner"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="contact-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="contact-modal-close"
              type="button"
              aria-label="Close contact options"
              onClick={() => setContactModalOpen(false)}
            >
              <X size={20} />
            </button>

            <div className="contact-modal-icon">
              <Phone size={26} strokeWidth={1.6} />
            </div>

            <span className="contact-modal-eyebrow">HOW WOULD YOU LIKE TO REACH US?</span>
            <h3>Let's talk about<br /><em>your stay.</em></h3>
            <p className="contact-modal-sub">
              Choose whichever feels easiest — we're happy to help with dates, rates and room availability.
            </p>

            <div className="contact-modal-options">
              <Link
                to="/contact"
                className="contact-option contact-option-primary"
                onClick={() => setContactModalOpen(false)}
              >
                <span className="contact-option-icon">
                  <Mail size={20} />
                </span>
                <span className="contact-option-copy">
                  <strong>Send an Online Enquiry</strong>
                  <small>We'll respond as soon as possible</small>
                </span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/contact"
                className="contact-option"
                onClick={() => setContactModalOpen(false)}
              >
                <span className="contact-option-icon">
                  <MapPin size={20} />
                </span>
                <span className="contact-option-copy">
                  <strong>Plan Your Visit</strong>
                  <small>Directions, hours and arrival info</small>
                </span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/rooms"
                className="contact-option"
                onClick={() => setContactModalOpen(false)}
              >
                <span className="contact-option-icon">
                  <BedDouble size={20} />
                </span>
                <span className="contact-option-copy">
                  <strong>Explore Accommodation</strong>
                  <small>View our rooms and rates</small>
                </span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <button
              className="contact-modal-dismiss"
              type="button"
              onClick={() => setContactModalOpen(false)}
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </>
  );
}