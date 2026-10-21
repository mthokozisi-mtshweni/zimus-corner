import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Check, ArrowLeft, ShieldCheck, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { roomTypes } from "../../constants/siteData"; 
import { images } from "../../assets/imageImports";
import RoomGallery from "../../components/RoomGallery";
import { fetchRoomBySlug, checkRoomAvailability } from "../../services/api";
import RoomCalendar from "../../components/RoomCalendar";
import { fetchBlockedDates } from "../../services/api";

export default function RoomDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Room State
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Booking State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  // Availability State
  const [availability, setAvailability] = useState({ checking: false, available: null, remainingRooms: 0 });

  const [blockedIntervals, setBlockedIntervals] = useState([]);

  // Fetch room data
    useEffect(() => {
    fetchRoomBySlug(slug)
      .then((data) => {
        setRoom(data);
        setLoading(false);
        // Fetch blocked dates
        fetchBlockedDates(data.id).then(setBlockedIntervals);
      })
      .catch((err) => {
        setError("Room not found.");
        setLoading(false);
      });
  }, [slug]);

  // Check availability when dates change
  useEffect(() => {
    if (!room || !checkIn || !checkOut) return;
    if (new Date(checkIn) >= new Date(checkOut)) return;

    setAvailability({ checking: true, available: null, remainingRooms: 0 });
    
    checkRoomAvailability(room.id, checkIn, checkOut)
      .then((res) => {
        setAvailability({ 
          checking: false, 
          available: res.available, 
          remainingRooms: res.remainingRooms 
        });
      })
      .catch((err) => {
        console.error(err);
        setAvailability({ checking: false, available: null, remainingRooms: 0 });
      });
  }, [checkIn, checkOut, room]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "8rem 0", textAlign: "center" }}>
        <Loader2 size={40} className="animate-spin" color="var(--gold)" style={{ margin: "0 auto" }} />
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="container" style={{ padding: "8rem 0", textAlign: "center" }}>
        <h2>Room not found</h2>
        <Link to="/rooms" style={{ color: "var(--gold)" }}>Return to all rooms</Link>
      </div>
    );
  }

  const staticFeatures = roomTypes.find(r => r.slug === slug)?.features || ["Access to Pools", "Braai Area", "Free Parking"];

    // Calculate nights and total price
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * room.price;
  
  const handleProceed = () => {
    if (!checkIn || !checkOut) return alert("Please select check-in and check-out dates.");
    if (new Date(checkIn) >= new Date(checkOut)) return alert("Check-out date must be after check-in date.");
    if (availability.available === false) return alert("This room is fully booked for these dates.");

    navigate("/booking/checkout", {
      state: {
        type: "room",
        roomId: room.id,
        roomName: room.name,
        checkIn,
        checkOut,
        guests
      }
    });
  };

  // Determine button state
  const isBtnDisabled = !checkIn || !checkOut || availability.available === false || availability.checking;

  return (
    <section style={{ padding: "4rem 0", background: "var(--ivory)", minHeight: "100vh" }}>
      <div className="container">
        
        <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--forest)", fontWeight: 600, cursor: "pointer", marginBottom: "2rem", padding: 0 }}>
          <ArrowLeft size={18} /> Back to rooms
        </button>

        <div style={{ display: "grid", gap: "3rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          
          {/* LEFT: Images & Description */}
          <div>
            <div style={{ borderRadius: "24px", overflow: "hidden", marginBottom: "2rem", boxShadow: "0 20px 40px -20px rgba(16,26,23,0.2)" }}>
               <RoomGallery 
                 images={room.imageKeys.map(imgKey => images[imgKey])} 
                 roomName={room.name} 
               />
            </div>

            <h1 style={{ fontSize: "2.5rem", color: "var(--forest)", marginBottom: "1rem" }}>{room.name}</h1>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, opacity: 0.8, marginBottom: "2rem" }}>
              {room.description}
            </p>

            <h3 style={{ fontSize: "1.3rem", color: "var(--forest)", marginBottom: "1rem" }}>Room Amenities</h3>
            <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", listStyle: "none", padding: 0 }}>
              {staticFeatures.map((feature) => (
                <li key={feature} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem", color: "var(--charcoal)" }}>
                  <div style={{ background: "rgba(217,164,65,0.2)", padding: "0.25rem", borderRadius: "50%" }}>
                    <Check size={16} color="var(--forest)" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Sticky Booking Widget */}
          <div>
            <div style={{ 
              position: "sticky", 
              top: "100px", 
              background: "var(--white)", 
              padding: "2rem", 
              borderRadius: "24px", 
              boxShadow: "0 20px 40px -20px rgba(16,26,23,0.15)",
              border: "1px solid rgba(16,26,23,0.05)"
            }}>
              <h2 style={{ fontSize: "1.8rem", color: "var(--forest)", marginBottom: "0.5rem" }}>Book Your Stay</h2>
              <p style={{ opacity: 0.7, marginBottom: "1.5rem", fontSize: "0.9rem" }}>Select your dates to check availability.</p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                                <RoomCalendar 
                  blockedIntervals={blockedIntervals}
                  selectedCheckIn={checkIn ? new Date(checkIn) : null}
                  selectedCheckOut={checkOut ? new Date(checkOut) : null}
                  onSelectDates={(start, end) => {
                    // Helper to format dates in LOCAL time, not UTC
                    const formatLocal = (d) => {
                      if (!d) return "";
                      const yyyy = d.getFullYear();
                      const mm = String(d.getMonth() + 1).padStart(2, '0');
                      const dd = String(d.getDate()).padStart(2, '0');
                      return `${yyyy}-${mm}-${dd}`;
                    };
                    setCheckIn(start ? formatLocal(start) : "");
                    setCheckOut(end ? formatLocal(end) : "");
                  }}
                />
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem" }}>Guests</label>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ccc", background: "white" }}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                  </select>
                </div>
              </div>

                            {/* AVAILABILITY INDICATOR */}
              {checkIn && checkOut && new Date(checkIn) < new Date(checkOut) && (
                <div style={{ marginBottom: "1.5rem" }}>
                  {availability.checking ? (
                    <p style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#666", fontSize: "0.9rem" }}>
                      <Loader2 size={16} className="animate-spin" /> Checking availability...
                    </p>
                  ) : availability.available === false ? (
                    <div style={{ background: "rgba(220,53,69,0.1)", color: "#dc3545", padding: "1rem", borderRadius: "8px", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <AlertCircle size={20} style={{ flexShrink: 0 }} />
                      <div>
                        <strong style={{ display: "block", marginBottom: "0.25rem" }}>Dates Occupied</strong>
                        <span style={{ fontSize: "0.85rem" }}>All rooms of this type are fully booked for these dates. Please select another date.</span>
                      </div>
                    </div>
                  ) : availability.available === true ? (
                    <div style={{ background: "rgba(40,167,69,0.1)", color: "#28a745", padding: "1rem", borderRadius: "8px", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
                      <div>
                        <strong style={{ display: "block", marginBottom: "0.25rem" }}>Available!</strong>
                        <span style={{ fontSize: "0.85rem" }}>{availability.remainingRooms} room(s) left for these dates.</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {/* --- PRICE CALCULATION BLOCK (MISSING IN YOUR CODE) --- */}
              <div style={{ borderTop: "1px solid #eee", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", color: "var(--charcoal)" }}>
                  <span>R{(room.price / 100).toLocaleString()} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
                  <span>R{(totalPrice / 100).toLocaleString()}</span>
                </div>
                
                {nights > 0 ? (
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "var(--forest)", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px dashed #ccc" }}>
                    <span>Total</span>
                    <span>R{(totalPrice / 100).toLocaleString()}</span>
                  </div>
                ) : (
                  <p style={{ fontSize: "0.85rem", opacity: 0.6, margin: 0, fontStyle: "italic" }}>
                    Select dates to see total price
                  </p>
                )}
              </div>

              <button 
                onClick={handleProceed}
                disabled={isBtnDisabled}
                style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center",
                  width: "100%", 
                  background: isBtnDisabled ? "#ccc" : "var(--gold)", 
                  color: "var(--forest)", 
                  padding: "1rem", 
                  borderRadius: "8px", 
                  fontWeight: 700, 
                  fontSize: "1.1rem",
                  border: "none",
                  cursor: isBtnDisabled ? "not-allowed" : "pointer",
                  transition: "background 0.2s"
                }}
              >
                {availability.available === false ? "Dates Unavailable" : "Proceed to Booking"}
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1rem", fontSize: "0.8rem", opacity: 0.6 }}>
                <ShieldCheck size={16} /> Secure Booking Process
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}