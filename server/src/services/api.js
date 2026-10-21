const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const fetchRooms = async () => {
  const res = await fetch(`${API_URL}/rooms`);
  if (!res.ok) throw new Error("Failed to fetch rooms");
  return res.json();
};

export const fetchEvents = async () => {
  const res = await fetch(`${API_URL}/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
};


export const createRoomBooking = async (data) => {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to create booking");
  return result;
};

export const createTicketOrder = async (data) => {
  const res = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to create order");
  return result;
};

export const fetchBookingByReference = async (reference) => {
  const res = await fetch(`${API_URL}/bookings/${reference}`);
  if (!res.ok) throw new Error("Booking not found");
  return res.json();
};

export const fetchOrderByReference = async (reference) => {
  const res = await fetch(`${API_URL}/tickets/${reference}`);
  if (!res.ok) throw new Error("Order not found");
  return res.json();
};