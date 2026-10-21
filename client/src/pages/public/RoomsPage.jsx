import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, Search, ArrowRight, Star, Check, Loader2 } from "lucide-react";
import { images } from "../../assets/imageImports";
import { fetchRooms, searchAvailableRooms } from "../../services/api";
import RoomGallery from "../../components/RoomGallery";
import Reveal from "../../components/Reveal";
import "../../styles/rooms.css";

export default function RoomsPage() {
  // Search inputs
  const [searchData, setSearchData] = useState({ checkIn: "", checkOut: "", guests: "1" });
  
  // Room states
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 1. Load all rooms on page load
  useEffect(() => {
    fetchRooms()
      .then(data => {
        setRooms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 2. Handle Availability Check
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchData.checkIn || !searchData.checkOut) {
      return alert("Please select both check-in and check-out dates.");
    }

    setSearchLoading(true);
    setHasSearched(true);
    
    try {
      // Fetch rooms that match the dates and guest count
      const results = await searchAvailableRooms(searchData.checkIn, searchData.checkOut, searchData.guests);
      setRooms(results);
    } catch (err) {
      alert("Failed to check availability. Please try again.");
    } finally {
      setSearchLoading(false);

    }
  };

  return (
    <>
      {/* HEADER */}
      <section style={{ background: "var(--forest)", color: "var(--ivory)", padding: "6rem 0 8rem", textAlign: "center" }}>
        <div className="container">
          <p style={{ color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600 }}>
            Accommodation
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginTop: "1rem" }}>
            Rest in <em style={{ fontStyle: "italic", color: "var(--gold)" }}>style.</em>
          </h1>
          <p style={{ maxWidth: "600px", margin: "1rem auto 0", opacity: 0.8, fontSize: "1.1rem" }}>
            Choose from our thoughtfully prepared room types, designed for your ultimate comfort and relaxation.
          </p>
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="container" style={{ marginTop: "-3rem", position: "relative", zIndex: 10 }}>
        <Reveal>
          <form 
            onSubmit={handleSearch}
            style={{ 
              background: "var(--white)", borderRadius: "16px", padding: "1.5rem", 
              boxShadow: "0 20px 40px -20px rgba(16,26,23,0.2)", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-end"
            }}
          >
            <div style={{ flex: "1 1 200px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--forest)" }}>Check-in</label>
              <div style={{ position: "relative" }}>
                <Calendar size={18} color="var(--gold)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
                <input 
                  type="date" 
                  value={searchData.checkIn} 
                  onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})} 
                  style={{ width: "100%", padding: "0.75rem 0.75rem 0.75rem 2.5rem", borderRadius: "8px", border: "1px solid #ccc", outline: "none" }} 
                />
              </div>
            </div>

            <div style={{ flex: "1 1 200px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--forest)" }}>Check-out</label>
              <div style={{ position: "relative" }}>
                <Calendar size={18} color="var(--gold)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
                <input 
                  type="date" 
                  value={searchData.checkOut} 
                  onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})} 
                  style={{ width: "100%", padding: "0.75rem 0.75rem 0.75rem 2.5rem", borderRadius: "8px", border: "1px solid #ccc", outline: "none" }} 
                />
              </div>
            </div>

            <div style={{ flex: "1 1 150px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--forest)" }}>Guests</label>
              <div style={{ position: "relative" }}>
                <Users size={18} color="var(--gold)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
                <select 
                  value={searchData.guests} 
                  onChange={(e) => setSearchData({...searchData, guests: e.target.value})} 
                  style={{ width: "100%", padding: "0.75rem 0.75rem 0.75rem 2.5rem", borderRadius: "8px", border: "1px solid #ccc", outline: "none", background: "white" }}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={searchLoading} style={{ background: "var(--gold)", color: "var(--forest)", padding: "0.8rem 2rem", borderRadius: "8px", fontWeight: 600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", height: "46px" }}>
              {searchLoading ? <Loader2 size={18} className="animate-spin" /> : <><Search size={18} /> Check Availability</>}
            </button>
          </form>
        </Reveal>
      </div>

      {/* ROOMS LIST */}
      <section className="rooms-section">
        <div className="container">
          
          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
               <Loader2 size={40} className="animate-spin" color="var(--gold)" style={{ margin: "0 auto" }} />
            </div>
          ) : rooms.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <h2 style={{ color: "var(--forest)" }}>No rooms available</h2>
              <p>We couldn't find any rooms matching your criteria. Please try different dates.</p>
            </div>
          ) : (
            <div className="rooms-grid">
              {rooms.map((room, index) => {
                const roomImages = room.imageKeys.map(key => images[key]);
                const displayFeatures = ["Access to Pools", "Braai Area", "Free Parking", "Wifi"];
                const isUnavailable = hasSearched && room.isAvailable === false;

                return (
                  <Reveal key={room.slug} delay={index * 150}>
                    <article className="room-card" style={{ opacity: isUnavailable ? 0.7 : 1 }}>
                      
                      <RoomGallery images={roomImages} roomName={room.name} />
                      
                      <span className="room-tag" style={{ background: isUnavailable ? "#dc3545" : "var(--gold)", color: isUnavailable ? "#fff" : "var(--forest)" }}>
                        <Star size={12} /> {isUnavailable ? "Unavailable" : "Available"}
                      </span>

                      <div className="room-body">
                        <div className="room-header">
                          <h3>{room.name}</h3>
                          <div className="room-price">
                            <strong>R{(room.price / 100).toLocaleString()}</strong>
                            <small>per night</small>
                          </div>
                        </div>
                        
                        <ul className="room-features">
                          {displayFeatures.map((f) => (
                            <li key={f}><Check size={16} /> {f}</li>
                          ))}
                        </ul>
                        
                        {/* Show warning if fully booked for selected dates */}
                        {isUnavailable && (
                          <div style={{ background: "#f8d7da", color: "#721c24", padding: "0.5rem", borderRadius: "4px", fontSize: "0.8rem", marginBottom: "1rem", textAlign: "center", fontWeight: 600 }}>
                            Fully booked for these dates
                          </div>
                        )}

                        {/* Link to the details page where the calendar lives */}
                        <Link to={`/rooms/${room.slug}`} className="room-cta">
                          {isUnavailable ? "View Details & Calendar" : "View Details & Book"} <ArrowRight size={16} />
                        </Link>
                        
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
          
          {/* <p className="rooms-note">
            * Rates are indicative. Please confirm availability and final pricing directly with the resort.
          </p> */}
        </div>
      </section>
    </>
  );
}