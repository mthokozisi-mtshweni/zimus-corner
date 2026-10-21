import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      // Save token to local storage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminName", data.user.name);
      
      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--forest)" }}>
      <div style={{ background: "var(--white)", padding: "3rem", borderRadius: "16px", width: "100%", maxWidth: "400px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
        
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--forest)", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Admin Portal</h1>
          <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>Sign in to manage Zimu's Corner</p>
        </div>

        {error && <div style={{ background: "rgba(220,53,69,0.1)", color: "#dc3545", padding: "0.75rem", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div style={{ position: "relative" }}>
            <Mail size={18} color="#999" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
            <input 
              type="email" 
              required 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "0.85rem 0.85rem 0.85rem 2.8rem", borderRadius: "8px", border: "1px solid #ddd" }} 
            />
          </div>
          <div style={{ position: "relative" }}>
            <Lock size={18} color="#999" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
            <input 
              type="password" 
              required 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "0.85rem 0.85rem 0.85rem 2.8rem", borderRadius: "8px", border: "1px solid #ddd" }} 
            />
          </div>
          <button type="submit" disabled={loading} style={{ background: "var(--gold)", color: "var(--forest)", padding: "1rem", borderRadius: "8px", fontWeight: 700, border: "none", cursor: "pointer", display: "flex", justifyContent: "center", marginTop: "0.5rem" }}>
            {loading ? <Loader2 className="animate-spin" size={20}/> : "Sign In"}
          </button>
        </form>

      </div>
    </div>
  );
}