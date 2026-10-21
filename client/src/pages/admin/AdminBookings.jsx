import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import "../../styles/admin.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    fetch("http://localhost:5000/api/v1/admin/bookings", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: "center", padding: "4rem" }}><Loader2 className="animate-spin" /></div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "2rem", color: "var(--forest)", margin: 0 }}>Room Bookings</h1>
      </div>

      <div className="admin-table-container">
        {bookings.length === 0 ? (
          <div className="empty-state">
            <h3>No bookings yet</h3>
            <p>When guests book a room, it will appear here.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Dates</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td style={{ fontWeight: 600 }}>{booking.reference}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{booking.guestName}</div>
                    <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>{booking.guestPhone}</div>
                  </td>
                  <td>{booking.roomType.name}</td>
                  <td>
                    {new Date(booking.checkIn).toLocaleDateString()} - <br/>
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </td>
                  <td style={{ fontWeight: 600 }}>R{(booking.totalAmount / 100).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}