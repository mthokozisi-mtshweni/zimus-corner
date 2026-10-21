const API_URL = "http://localhost:5000/api/v1";

// ==========================================
// ROOMS
// ==========================================
export const fetchRooms = async () => {
  const res = await fetch(`${API_URL}/rooms`);
  if (!res.ok) throw new Error("Failed to fetch rooms");
  return res.json();
};

export const fetchRoomBySlug = async (slug) => {
  const res = await fetch(`${API_URL}/rooms/${slug}`);
  if (!res.ok) throw new Error("Room not found");
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

export const fetchBookingByReference = async (reference) => {
  const res = await fetch(`${API_URL}/bookings/${reference}`);
  if (!res.ok) throw new Error("Booking not found");
  return res.json();
};

// ==========================================
// EVENTS & TICKETS
// ==========================================
export const fetchEvents = async () => {
  const res = await fetch(`${API_URL}/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
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
}

export const fetchOrderByReference = async (reference) => {
  const res = await fetch(`${API_URL}/tickets/${reference}`);
  if (!res.ok) throw new Error("Order not found");
  return res.json();
};

export const fetchEventById = async (id) => {
  const res = await fetch(`${API_URL}/events/${id}`);
  if (!res.ok) throw new Error("Event not found");
  return res.json();
};

export const checkRoomAvailability = async (roomId, checkIn, checkOut) => {
  const res = await fetch(`${API_URL}/rooms/${roomId}/availability?checkIn=${checkIn}&checkOut=${checkOut}`);
  if (!res.ok) throw new Error("Failed to check availability");
  return res.json();
};

export const searchAvailableRooms = async (checkIn, checkOut, guests) => {
  const res = await fetch(`${API_URL}/rooms/search/availability?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
};

export const fetchBlockedDates = async (roomId) => {
  const res = await fetch(`${API_URL}/rooms/${roomId}/blocked-dates`);
  if (!res.ok) throw new Error("Failed to fetch blocked dates");
  return res.json();
};