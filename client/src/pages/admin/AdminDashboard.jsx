import { useState, useEffect } from "react";
import { Loader2, TrendingUp, Ticket, BedDouble } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    fetch("http://localhost:5000/api/v1/admin/stats", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setStats(data);
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
      <h1 style={{ fontSize: "2rem", color: "var(--forest)", marginBottom: "2rem" }}>Dashboard Overview</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        
        <div style={{ background: "var(--white)", padding: "2rem", borderRadius: "12px", boxShadow: "var(--shadow-soft)", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ background: "rgba(217,164,65,0.15)", padding: "1rem", borderRadius: "50%" }}>
            <BedDouble size={28} color="var(--gold)" />
          </div>
          <div>
            <p style={{ opacity: 0.6, margin: 0, fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase" }}>Room Bookings</p>
            <h2 style={{ fontSize: "2.2rem", color: "var(--forest)", margin: 0 }}>{stats?.totalBookings || 0}</h2>
          </div>
        </div>

        <div style={{ background: "var(--white)", padding: "2rem", borderRadius: "12px", boxShadow: "var(--shadow-soft)", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ background: "rgba(217,164,65,0.15)", padding: "1rem", borderRadius: "50%" }}>
            <Ticket size={28} color="var(--gold)" />
          </div>
          <div>
            <p style={{ opacity: 0.6, margin: 0, fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase" }}>Ticket Orders</p>
            <h2 style={{ fontSize: "2.2rem", color: "var(--forest)", margin: 0 }}>{stats?.totalOrders || 0}</h2>
          </div>
        </div>

        <div style={{ background: "var(--forest)", padding: "2rem", borderRadius: "12px", boxShadow: "var(--shadow-soft)", display: "flex", alignItems: "center", gap: "1.5rem", color: "var(--ivory)" }}>
          <div style={{ background: "rgba(255,255,255,0.1)", padding: "1rem", borderRadius: "50%" }}>
            <TrendingUp size={28} color="var(--gold)" />
          </div>
          <div>
            <p style={{ opacity: 0.8, margin: 0, fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase" }}>Total Revenue</p>
            <h2 style={{ fontSize: "2.2rem", color: "var(--gold)", margin: 0 }}>R{((stats?.totalRevenue || 0) / 100).toLocaleString()}</h2>
          </div>
        </div>

      </div>
    </div>
  );
}