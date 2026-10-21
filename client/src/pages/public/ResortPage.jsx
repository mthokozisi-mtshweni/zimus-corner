import { Link } from "react-router-dom";
import { images } from "../../assets/imageImports";
import { resortInfo, includedFacilities } from "../../constants/siteData";
import { 
  Waves, Droplets, Flame, Castle, ArrowUp, Play, Music, Sparkles, Leaf, Calendar, ArrowRight 
} from "lucide-react";
import Reveal from "../../components/Reveal";
import "../../styles/resort.css";

const iconMap = {
  waves: Waves, droplets: Droplets, flame: Flame, castle: Castle,
  up: ArrowUp, play: Play, music: Music, sparkles: Sparkles, leaf: Leaf, calendar: Calendar,
};

export default function ResortPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section 
        className="resort-hero" 
        style={{ backgroundImage: `url(${images.garden1})` }}
      >
        <div className="resort-hero-overlay"></div>
        <div className="container resort-hero-content">
          <Reveal direction="up">
            <p className="resort-eyebrow">Discover Zimu's Corner</p>
            <h1 className="resort-title">
              A vibrant lifestyle hub in <em>Tweefontein.</em>
            </h1>
            <p className="resort-hero-subtitle">
              Your ultimate destination for relaxation, celebration, and unforgettable family moments in Mpumalanga.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="resort-story">
        <div className="container resort-story-grid">
          <Reveal direction="left">
            <div className="resort-story-text">
              <h2>Welcome to <br/> Zimu's Corner</h2>
              <p>{resortInfo.description}</p>
              <p>
                Whether you are planning a family day out, a weekend getaway, or looking for the perfect venue for a wedding or private celebration, Zimu's Corner offers a unique and lively atmosphere. 
              </p>
              <p>
                With multiple pools, lush gardens, and dedicated entertainment zones, we provide an affordable escape where you can truly unwind and enjoy the vibe.
              </p>
            </div>
          </Reveal>
          
          <Reveal direction="right" delay={200}>
            <div className="resort-story-image-wrapper">
              <img 
                src={images.pool2 || images.pool1} 
                alt="Resort Accommodation" 
                className="resort-story-image" 
              />
              <div className="resort-badge">
                <span>100%</span>
                Family Friendly
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="resort-quote">
        <div className="container">
          <Reveal>
            <blockquote>
              An affordable escape where you can truly unwind, soak up the sun, and enjoy the vibrant energy of Mpumalanga.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* VISUAL SHOWCASE */}
      <section className="resort-showcase">
        <div className="container">
          <div className="resort-showcase-grid">
            <Reveal delay={100}>
              <img src={images.realEvent1 || images.pool2} alt="Resort Event" />
            </Reveal>
            <Reveal delay={200}>
              <img src={images.realRoom2 || images.pool3} alt="Resort Pool" />
            </Reveal>
            <Reveal delay={300}>
              <img src={images.pool1} alt="Resort Garden" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FACILITIES SECTION */}
      <section className="resort-facilities">
        <div className="container">
          <Reveal>
            <div className="resort-facilities-header">
              <h2>Our Premium Facilities</h2>
              <p>Everything you need for a perfect day out is right here on the property. Included with your entry.</p>
            </div>
          </Reveal>
          
          <div className="resort-facilities-grid">
            {includedFacilities.map((facility, index) => {
              const Icon = iconMap[facility.icon] || Sparkles;
              return (
                <Reveal key={facility.name} delay={index * 50}>
                  <div className="resort-facility-card">
                    <div className="resort-facility-icon">
                      <Icon size={24} color="var(--gold)" />
                    </div>
                    <span>{facility.name}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="resort-cta">
        <div className="container">
          <Reveal>
            <h2>Ready to Experience Zimu's Corner?</h2>
            <p>Book your stay or plan your visit today. We can't wait to welcome you.</p>
            <Link to="/rooms" className="resort-cta-btn">
              Book Your Escape <ArrowRight size={20} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}