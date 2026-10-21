import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Calendar, MapPin, Loader2, ArrowRight } from "lucide-react";
import { fetchBookingByReference, fetchOrderByReference } from "../../services/api";

export default function ConfirmationPage() {
  const { reference } = useParams();
  const [data, setData] = useState(null);
  const [type, setType] = useState(null); // "room" or "event"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try fetching as a room booking first
        try {
          const booking = await fetchBookingByReference(reference);
          setData(booking);
          setType("room");
          setLoading(false);
          return;
        } catch (e) {
          // If it fails, try fetching as a ticket order
          const order = await fetchOrderByReference(reference);
          setData(order);
          setType("event");
          setLoading(false);
        }
      } catch (err) {
        setError("Could not find this booking. Please check your reference number.");
        setLoading(false);
      }
    };
    fetchData();
  }, [reference]);

  if (loading) return <div style={{ padding: "8rem", textAlign: "center" }}><Loader2 className="animate-spin" size={40}/></div>;
  if (error) return <div style={{ padding: "8rem", textAlign: "center" }}><h2>{error}</h2></div>;

  return (
    <section style={{ padding: "6rem 0", background: "var(--ivory)", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "600px" }}>
        
        <div style={{ background: "var(--white)", padding: "3rem", borderRadius: "20px", boxShadow: "0 20px 40px -20px rgba(16,26,23,0.2)", textAlign: "center" }}>
          <CheckCircle2 size={64} color="#28a745" style={{ margin: "0 auto 1.5rem" }} />
          
          <h1 style={{ fontSize: "2rem", color: "var(--forest)", marginBottom: "0.5rem" }}>Booking Received!</h1>
          <p style={{ opacity: 0.7, marginBottom: "2rem" }}>Your reference number is <strong style={{ color: "var(--forest)", fontSize: "1.2rem" }}>{reference}</strong></p>

          <div style={{ background: "var(--ivory)", padding: "1.5rem", borderRadius: "12px", textAlign: "left", marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--forest)", marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>Summary</h3>
            
            {type === "event" ? (
              <>
                <p style={{ margin: "0.5rem 0", display: "flex", justifyContent: "space-between" }}><span>Event:</span> <strong>{data.event.title}</strong></p>
                <p style={{ margin: "0.5rem 0", display: "flex", justifyContent: "space-between" }}><span>Date:</span> <strong>{data.event.date}</strong></p>
                <p style={{ margin: "0.5rem 0", display: "flex", justifyContent: "space-between" }}><span>Total:</span> <strong>R{data.totalAmount / 100}</strong></p>
              </>
            ) : (
              <>
                <p style={{ margin: "0.5rem 0", display: "flex", justifyContent: "space-between" }}><span>Room:</span> <strong>{data.roomType.name}</strong></p>
                <p style={{ margin: "0.5rem 0", display: "flex", justifyContent: "space-between" }}><span>Check-in:</span> <strong>{new Date(data.checkIn).toLocaleDateString()}</strong></p>
                <p style={{ margin: "0.5rem 0", display: "flex", justifyContent: "space-between" }}><span>Check-out:</span> <strong>{new Date(data.checkOut).toLocaleDateString()}</strong></p>
                <p style={{ margin: "0.5rem 0", display: "flex", justifyContent: "space-between" }}><span>Total:</span> <strong>R{data.totalAmount / 100}</strong></p>
              </>
            )}
          </div>

          <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "2rem" }}>
            An email has been sent to <strong>{data.guestEmail}</strong> with your confirmation details.
          </p>

          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--forest)", color: "var(--ivory)", padding: "1rem 2rem", borderRadius: "8px", fontWeight: 600, textDecoration: "none" }}>
            Return to Homepage <ArrowRight size={16}/>
          </Link>
        </div>

      </div>
    </section>
  );
}