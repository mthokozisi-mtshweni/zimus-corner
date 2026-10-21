import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { logo } from "../assets/imageImports";
import { resortInfo } from "../constants/siteData";
import "../styles/layout.css";

const nav = [
  { label: "Home", to: "/" },
  { label: "Resort", to: "/resort" },
  { label: "Experiences", to: "/experiences" },
  { label: "Rooms", to: "/rooms" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50, // Lower than the drawer (100) so drawer covers it
          background: "var(--forest)",
          color: "var(--ivory)",
          borderBottom: "1px solid rgba(217,164,65,0.25)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 0",
          }}
        >
          {/* HEADER LOGO */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginLeft: "1rem" }}>
            <img
              src={logo}
              alt="Zimu's Corner Lifestyle Resort logo"
              style={{ 
                height: "52px", 
                width: "auto", 
                objectFit: "contain",
                filter: "invert(1)",
                mixBlendMode: "screen"
              }}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }} className="desktop-nav">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                end={item.to === "/"}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" className="nav-book-btn">
              Plan Your Visit
            </Link>
          </nav>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", color: "var(--ivory)", display: "none", alignItems: "center", justifyContent: "center" }}
            className="mobile-toggle"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER OVERLAY (Blurred Background) */}
      <div 
        className={`mobile-drawer-overlay ${open ? "open" : ""}`} 
        onClick={() => setOpen(false)} 
      />

      {/* MOBILE SIDE DRAWER */}
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        <div className="mobile-drawer-header">
          <img
            src={logo}
            alt="Zimu's Corner Logo"
            style={{ height: "40px", filter: "invert(1)", mixBlendMode: "screen" }}
          />
          <button 
            className="mobile-drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mobile-drawer-links">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
              end={item.to === "/"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="mobile-drawer-footer">
          <Link to="/contact" className="mobile-nav-btn">
            Plan Your Visit <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <main>
        <Outlet />
      </main>

      <footer style={{ background: "var(--forest)", color: "var(--ivory)", marginTop: "4rem" }}>
        <div
          className="container"
          style={{
            padding: "3rem 0",
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <div>
            {/* FOOTER LOGO */}
            <div style={{ marginBottom: "1rem", marginLeft: "1rem" }}>
              <img
                src={logo}
                alt="Zimu's Corner Lifestyle Resort"
                style={{ 
                  height: "70px", 
                  width: "auto", 
                  objectFit: "contain",
                  filter: "invert(1)",
                  mixBlendMode: "screen"
                }}
              />
            </div>
            <p style={{ opacity: 0.75, fontSize: "0.9rem", marginTop: 0 }}>{resortInfo.location}</p>
          </div>
          <div>
            <p style={{ fontWeight: 600, marginBottom: "0.5rem", color: "var(--gold)" }}>Explore</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.9rem", opacity: 0.8, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li><Link to="/resort" style={{ color: "inherit", textDecoration: "none" }}>The Resort</Link></li>
              <li><Link to="/experiences" style={{ color: "inherit", textDecoration: "none" }}>Experiences</Link></li>
              <li><Link to="/gallery" style={{ color: "inherit", textDecoration: "none" }}>Gallery</Link></li>
            </ul>
          </div>
          <div>
            <p style={{ fontWeight: 600, marginBottom: "0.5rem", color: "var(--gold)" }}>Legal</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.9rem", opacity: 0.8, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li><Link to="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</Link></li>
              <li><Link to="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms</Link></li>
            </ul>
          </div>
          <div>
            <p style={{ fontWeight: 600, marginBottom: "0.5rem", color: "var(--gold)" }}>Contact</p>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
              Contact details pending verification. Please check back soon.
            </p>
          </div>
        </div>
        <div
          className="container"
          style={{
            padding: "1.5rem 0",
            borderTop: "1px solid rgba(245,240,231,0.1)",
            fontSize: "0.8rem",
            opacity: 0.6,
            textAlign: "center"
          }}
        >
          © {new Date().getFullYear()} {resortInfo.name}. Built by Bendalo Tech & Innovation.
        </div>
      </footer>
    </>
  );
}