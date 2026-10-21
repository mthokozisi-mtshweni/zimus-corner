import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Minus, Plus, ShieldCheck, Loader2 } from "lucide-react";
import { images } from "../../assets/imageImports";
import { fetchEventById } from "../../services/api";
import "../../styles/events.css";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // State to hold selected quantities for each ticket tier (keyed by ticket.id)
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchEventById(id)
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Event not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "8rem 0", textAlign: "center" }}>
        <Loader2 size={40} className="animate-spin" color="var(--gold)" style={{ margin: "0 auto" }} />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container" style={{ padding: "8rem 0", textAlign: "center" }}>
        <h2>{error || "Event not found"}</h2>
        <Link to="/events" style={{ color: "var(--gold)" }}>Return to events</Link>
      </div>
    );
  }

  // Handle quantity changes using ticket ID
  const handleQuantity = (ticketId, change) => {
    setQuantities((prev) => {
      const current = prev[ticketId] || 0;
      const next = Math.max(0, current + change);
      return { ...prev, [ticketId]: next };
    });
  };

  // Calculate total price
  const totalPrice = event.tickets.reduce((total, ticket) => {
    const qty = quantities[ticket.id] || 0;
    return total + (ticket.price * qty);
  }, 0);

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);

  const handleProceed = () => {
    if (totalTickets === 0) return alert("Please select at least one ticket.");
    
    navigate("/booking/checkout", {
      state: {
        type: "event",
        eventId: event.id,
        eventName: event.title,
        eventDate: event.date,
        tickets: quantities,
        totalPrice: totalPrice,
      }
    });
  };

  return (
    <section className="event-detail-section">
      <div className="container">
        
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={18} /> Back to events
        </button>

        <div className="event-detail-grid">
          
          {/* LEFT: Image & Info */}
          <div>
            <div className="event-detail-image-wrapper">
              <img src={images[event.imageKey]} alt={event.title} className="event-detail-image" />
              <span className="event-badge">Upcoming</span>
            </div>
            
            <h1 className="event-detail-title">{event.title}</h1>
            
            <div className="event-detail-meta">
              <span><Calendar size={18} color="var(--gold)"/> {event.date}</span>
              <span><Clock size={18} color="var(--gold)"/> {event.time}</span>
            </div>

            <p className="event-detail-desc">{event.description}</p>
          </div>

          {/* RIGHT: Ticket Selector Widget */}
          <div>
            <div className="ticket-selector">
              <h2>Select Tickets</h2>
              
              <div className="ticket-list">
                {event.tickets.map((ticket) => {
                  const available = ticket.capacity - ticket.sold;
                  const isSoldOut = available <= 0;
                  
                  return (
                    <div key={ticket.id} className="ticket-row" style={{ opacity: isSoldOut ? 0.5 : 1 }}>
                      <div className="ticket-info">
                        <h4>{ticket.name}</h4>
                        <p>{isSoldOut ? "Sold Out" : `${available} remaining`}</p>
                        <strong>R{(ticket.price / 100).toFixed(0)}</strong>
                      </div>
                      <div className="ticket-controls">
                        <button 
                          onClick={() => handleQuantity(ticket.id, -1)} 
                          disabled={isSoldOut}
                        >
                          <Minus size={16}/>
                        </button>
                        <span>{quantities[ticket.id] || 0}</span>
                        <button 
                          onClick={() => handleQuantity(ticket.id, 1)} 
                          disabled={isSoldOut || (quantities[ticket.id] || 0) >= available}
                        >
                          <Plus size={16}/>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="ticket-total">
                <div>
                  <span>Total Due Upfront</span>
                  <strong>R{(totalPrice / 100).toFixed(0)}</strong>
                </div>
                <small>{totalTickets} ticket(s) selected</small>
              </div>

              <div style={{ background: "rgba(220, 53, 69, 0.08)", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem", borderLeft: "4px solid #dc3545" }}>
                <p style={{ margin: "0 0 0.5rem", fontWeight: 700, fontSize: "0.85rem", color: "#dc3545" }}>Important Policies:</p>
                <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.8rem", opacity: 0.8 }}>
                  <li>Full payment is required upfront to secure your tickets.</li>
                  <li>All ticket sales are final and strictly <strong>non-refundable</strong>.</li>
                </ul>
              </div>

              <button 
                onClick={handleProceed} 
                className={`ticket-checkout-btn ${totalTickets === 0 ? "disabled" : ""}`}
                disabled={totalTickets === 0}
              >
                Proceed to Checkout
              </button>
              
              <div className="secure-note">
                <ShieldCheck size={16} /> Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}