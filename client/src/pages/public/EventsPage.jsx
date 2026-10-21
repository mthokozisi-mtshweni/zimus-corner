import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { images } from "../../assets/imageImports";
import { fetchEvents } from "../../services/api";
import Reveal from "../../components/Reveal";
import "../../styles/events.css";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Separate the first event (featured) from the rest
  const featuredEvent = events[0];
  const otherEvents = events.slice(1);

  return (
    <>
      {/* HERO */}
      <section className="events-hero">
        <div className="events-hero-bg"></div>
        <div className="container events-hero-content">
          <p className="events-eyebrow">What's On</p>
          <h1 className="events-title">
            Upcoming <em>Experiences.</em>
          </h1>
          <p className="events-subtitle">
            From Sip & Swim parties to Sunday family braais, there is always something happening at Zimu's Corner.
          </p>
        </div>
      </section>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "6rem 0" }}>
          <Loader2 size={40} className="animate-spin" color="var(--gold)" />
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "6rem 0", color: "red" }}>
          <h2>{error}</h2>
        </div>
      ) : events.length === 0 ? (
        <div style={{ textAlign: "center", padding: "6rem 0" }}>
          <h2>No events found.</h2>
          <p>Check back soon for upcoming events!</p>
        </div>
      ) : (
        <>
          {/* FEATURED EVENT */}
          {featuredEvent && (
            <section className="featured-event-section">
              <div className="container">
                <Reveal>
                  <Link to={`/events/${featuredEvent.id}`} className="featured-event-card">
                    
                    <div className="featured-event-image-wrapper">
                      <img 
                        src={images[featuredEvent.imageKey]} 
                        alt={featuredEvent.title} 
                        className="featured-event-image" 
                      />
                      <span className="featured-event-tag">
                        <Sparkles size={12} style={{ display: "inline", marginRight: "0.25rem", verticalAlign: "middle" }} />
                        Featured Event
                      </span>
                    </div>

                    <div className="featured-event-body">
                      <div className="featured-event-date">
                        <Calendar size={18} />
                        <span>{featuredEvent.date}</span>
                      </div>
                      <h2 className="featured-event-title">{featuredEvent.title}</h2>
                      <p className="featured-event-desc">{featuredEvent.description}</p>
                      <span className="featured-event-cta">
                        Get Tickets <ArrowRight size={18} />
                      </span>
                    </div>

                  </Link>
                </Reveal>
              </div>
            </section>
          )}

          {/* UPCOMING EVENTS GRID */}
          <section className="events-section">
            <div className="container">
              
              <Reveal>
                <div className="events-section-header">
                  <div>
                    <p style={{ color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                      Calendar
                    </p>
                    <h2>All Upcoming Events</h2>
                  </div>
                  <span className="events-count">
                    {otherEvents.length} {otherEvents.length === 1 ? "event" : "events"} scheduled
                  </span>
                </div>
              </Reveal>

              {otherEvents.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 0", opacity: 0.6 }}>
                  <p>More events coming soon.</p>
                </div>
              ) : (
                <div className="events-grid">
                  {otherEvents.map((event, index) => (
                    <Reveal key={event.id} delay={index * 100}>
                      <Link to={`/events/${event.id}`} className="event-card">
                        
                        <div className="event-image-wrapper">
                          <img src={images[event.imageKey]} alt={event.title} className="event-image" />
                          <span className="event-badge">Upcoming</span>
                        </div>

                        <div className="event-body">
                          <div className="event-date-time">
                            <Calendar size={16} />
                            <span>{event.date}</span>
                          </div>
                          <h3 className="event-name">{event.title}</h3>
                          <p className="event-desc">{event.description}</p>
                          <span className="event-btn">
                            Get Tickets <ArrowRight size={16} />
                          </span>
                        </div>

                      </Link>
                    </Reveal>
                  ))}
                </div>
              )}

            </div>
          </section>
        </>
      )}
    </>
  );
}