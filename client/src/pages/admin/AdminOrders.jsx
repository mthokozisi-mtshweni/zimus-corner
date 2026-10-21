import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import "../../styles/admin.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    fetch("http://localhost:5000/api/v1/admin/orders", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data);
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
        <h1 style={{ fontSize: "2rem", color: "var(--forest)", margin: 0 }}>Ticket Orders</h1>
      </div>

      <div className="admin-table-container">
        {orders.length === 0 ? (
          <div className="empty-state">
            <h3>No ticket orders yet</h3>
            <p>When guests buy tickets, they will appear here.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Guest</th>
                <th>Event</th>
                <th>Tickets</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600 }}>{order.reference}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{order.guestName}</div>
                    <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>{order.guestPhone}</div>
                  </td>
                  <td>{order.event.title}</td>
                  <td>
                    {order.items.map(item => (
                      <div key={item.id} style={{ fontSize: "0.85rem" }}>
                        {item.quantity}x {item.ticketType.name}
                      </div>
                    ))}
                  </td>
                  <td style={{ fontWeight: 600 }}>R{(order.totalAmount / 100).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
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