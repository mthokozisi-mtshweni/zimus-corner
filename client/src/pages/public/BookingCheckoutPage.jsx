import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import { createRoomBooking, createTicketOrder } from "../../services/api";
import "../../styles/checkout.css";

export default function BookingCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEvent = state.type === "event";
  const isRoom = state.type === "room";

  if (!isEvent && !isRoom) {
    return (
      <div className="container" style={{ padding: "8rem 0", textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <Link to="/events" style={{ color: "var(--gold)" }}>Browse Events</Link> or <Link to="/rooms" style={{ color: "var(--gold)" }}>Book a Room</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEvent) {
        // Format items for the backend
        const items = Object.entries(state.tickets)
          .filter(([_, qty]) => qty > 0)
          .map(([ticketTypeId, quantity]) => ({ ticketTypeId, quantity }));

        const res = await createTicketOrder({
          eventId: state.eventId,
          guestName: formData.name,
          guestEmail: formData.email,
          guestPhone: formData.phone,
          items
        });
        
        // Redirect to confirmation page
        navigate(`/booking/confirmation/${res.order.reference}`);
      } else {
        const res = await createRoomBooking({
          roomTypeId: state.roomId,
          checkIn: state.checkIn,
          checkOut: state.checkOut,
          guestName: formData.name,
          guestEmail: formData.email,
          guestPhone: formData.phone,
        });

        navigate(`/booking/confirmation/${res.booking.reference}`);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="checkout-section">
      <div className="container" style={{ maxWidth: "900px" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", color: "var(--forest)" }}>Complete Your Checkout</h1>
          <p style={{ opacity: 0.7 }}>Secure your spot at Zimu's Corner.</p>
        </div>

        <div className="checkout-grid">
          {/* Guest Details Form */}
          <div className="checkout-card">
            <h2 className="checkout-title">Guest Details</h2>
            {error && <div className="error-banner">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" required className="form-input" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" required className="form-input" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" required className="form-input" placeholder="071 234 5678" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <button type="submit" className="checkout-btn" disabled={loading}>
                {loading ? <Loader2 size={20} className="animate-spin" style={{ margin: "0 auto" }}/> : "Confirm & Reserve"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="summary-card">
              <h2 className="summary-title">Order Summary</h2>
              
              {isEvent && (
                <>
                  <div className="summary-row">
                    <span>Event</span>
                    <span>{state.eventName}</span>
                  </div>
                  <div className="summary-row">
                    <span>Date</span>
                    <span>{state.eventDate}</span>
                  </div>
                </>
              )}

              {isRoom && (
                <>
                  <div className="summary-row">
                    <span>Room</span>
                    <span>{state.roomName}</span>
                  </div>
                  <div className="summary-row">
                    <span>Check-in</span>
                    <span>{state.checkIn}</span>
                  </div>
                  <div className="summary-row">
                    <span>Check-out</span>
                    <span>{state.checkOut}</span>
                  </div>
                </>
              )}

              <div className="summary-total">
                <span>Total Due</span>
                <span>{isEvent ? `R${state.totalPrice / 100}` : "Calculated on server"}</span>
              </div>

              <div style={{ marginTop: "1.5rem", fontSize: "0.8rem", opacity: 0.7, display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <ShieldCheck size={18} color="var(--gold)" />
                <p style={{ margin: 0 }}>This is a demo. No real payment will be processed.</p>
              </div>
            </div>
            
            <Link to="#" onClick={() => navigate(-1)} style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--forest)", textDecoration: "underline" }}>
              <ArrowLeft size={16}/> Change Selection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}