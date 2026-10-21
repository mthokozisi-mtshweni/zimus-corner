import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="container" style={{ padding: "6rem 0" }}>
      <div style={{ display: "grid", gap: "4rem", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        
        {/* Contact Info */}
        <div>
          <p style={{ color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem" }}>
            Get in Touch
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 4vw, 3rem)", color: "var(--forest)", marginBottom: "1.5rem" }}>
            Plan Your Visit
          </h1>
          <p style={{ opacity: 0.8, lineHeight: 1.7, marginBottom: "2rem" }}>
            Have a question about day visits, events, or hosting your next celebration at Zimu's Corner? Send us a message and our team will get back to you.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <MapPin color="var(--gold)" size={24} />
              <div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>Location</h3>
                <p style={{ opacity: 0.8, margin: 0 }}>Tweefontein, Mpumalanga, South Africa</p>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <Phone color="var(--gold)" size={24} />
              <div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>Phone / WhatsApp</h3>
                <p style={{ opacity: 0.8, margin: 0, fontStyle: "italic", fontSize: "0.9rem" }}>Contact details pending verification</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <Mail color="var(--gold)" size={24} />
              <div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>Email</h3>
                <p style={{ opacity: 0.8, margin: 0, fontStyle: "italic", fontSize: "0.9rem" }}>Contact details pending verification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form UI */}
        <div style={{ background: "var(--white)", padding: "2.5rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-soft)" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Send an Enquiry</h2>
          <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }} onSubmit={(e) => e.preventDefault()}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>Name</label>
              <input type="text" placeholder="Your full name" style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid #ccc" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>Email or Phone</label>
              <input type="text" placeholder="How can we reach you?" style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid #ccc" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>Message</label>
              <textarea rows="4" placeholder="Tell us about your enquiry..." style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid #ccc", resize: "vertical" }}></textarea>
            </div>
            <button type="submit" style={{ background: "var(--gold)", color: "var(--forest)", padding: "0.85rem", borderRadius: "var(--radius-sm)", fontWeight: 600, border: "none", marginTop: "0.5rem" }}>
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}