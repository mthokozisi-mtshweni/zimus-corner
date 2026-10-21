import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, BedDouble, LogOut, Menu, X } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminName = localStorage.getItem("adminName") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Room Bookings", path: "/admin/bookings", icon: BedDouble },
    { name: "Ticket Orders", path: "/admin/orders", icon: Calendar },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Sidebar (Desktop) */}
      <aside style={{ width: "260px", background: "var(--forest)", color: "var(--ivory)", display: "flex", flexDirection: "column", position: "fixed", height: "100%", zIndex: 100 }}>
        <div style={{ padding: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--gold)", margin: 0 }}>Zimu's Admin</h2>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.8rem", opacity: 0.6 }}>Welcome, {adminName}</p>
        </div>
        <nav style={{ flex: 1, padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{
                display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 1rem", borderRadius: "8px",
                background: location.pathname === item.path ? "rgba(217,164,65,0.15)" : "transparent",
                color: location.pathname === item.path ? "var(--gold)" : "var(--ivory)",
                textDecoration: "none", fontWeight: 500, transition: "background 0.2s"
              }}
            >
              <item.icon size={20} /> {item.name}
            </Link>
          ))}
        </nav>
        <div style={{ padding: "1.5rem 1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%", background: "none", border: "none", color: "#ff6b6b", padding: "0.85rem 1rem", cursor: "pointer", fontWeight: 600 }}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
}