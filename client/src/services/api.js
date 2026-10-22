const API_URL = import.meta.env.VITE_API_URL || "https://zimus-corner.onrender.com/api/v1";

// Fallback content so the site always feels complete
const fallbackRooms = [
  {
    id: "lifestyle-getaway", slug: "lifestyle-getaway",
    name: "Lifestyle Getaway",
    description: "Our signature weekend escape. Enjoy full access to the resort's premium amenities, including multiple pools, braai areas, and our private jacuzzi.",
    price: 150000, capacity: 2, inventory: 5,
    imageKeys: ["realRoom1", "realRoom2", "realRoom3"],
    isPublished: true, isAvailable: true,
  },
  {
    id: "group-event-stay", slug: "group-event-stay",
    name: "Group & Event Stay",
    description: "Perfect for wedding parties and group celebrations. Combine multiple rooms with exclusive access to our event spaces and entertainment zones.",
    price: 350000, capacity: 10, inventory: 2,
    imageKeys: ["realRoom4", "realRoom5", "realRoom6"],
    isPublished: true, isAvailable: true,
  },
  {
    id: "couples-retreat", slug: "couples-retreat",
    name: "Couples Retreat",
    description: "A private, intimate escape designed for two. Unwind in your private jacuzzi, enjoy spa services, and take a sunset stroll through our lush gardens.",
    price: 180000, capacity: 2, inventory: 3,
    imageKeys: ["realRoom2", "realRoom5", "realRoom1"],
    isPublished: true, isAvailable: true,
  },
];

const fallbackEvents = [
  {
    id: "sip-and-swim",
    title: "Sip & Swim Party",
    description: "Join us for our seasonal Sip & Swim party featuring live DJs, poolside vibes, and our famous braai area.",
    date: "Saturday, 25th December", time: "12:00 PM - Late",
    imageKey: "realEvent1", isPublished: true,
    tickets: [
      { id: "sip-and-swim-a", name: "General Access (Adult)", price: 15000, capacity: 100, sold: 0 },
      { id: "sip-and-swim-b", name: "General Access (Child)", price: 8000, capacity: 50, sold: 0 },
      { id: "sip-and-swim-c", name: "VIP Poolside (Adult)", price: 35000, capacity: 20, sold: 0 },
      { id: "sip-and-swim-d", name: "Cooler Box Pass", price: 8000, capacity: 100, sold: 0 },
    ],
  },
  {
    id: "family-braai",
    title: "Sunday Family Braai",
    description: "Bring the whole family for a relaxing day of swimming, jumping castles, and outdoor music.",
    date: "Sunday, 26th December", time: "10:00 AM - 6:00 PM",
    imageKey: "realEvent2", isPublished: true,
    tickets: [
      { id: "family-braai-a", name: "Adult Day Pass", price: 6000, capacity: 200, sold: 0 },
      { id: "family-braai-b", name: "Kids Day Pass", price: 3000, capacity: 100, sold: 0 },
      { id: "family-braai-c", name: "Cooler Box Pass", price: 8000, capacity: 100, sold: 0 },
    ],
  },
  {
    id: "nye-celebration",
    title: "New Year's Eve Celebration",
    description: "Ring in the new year with us! Live performances, special drinks, and a spectacular poolside countdown.",
    date: "Friday, 31st December", time: "8:00 PM - 2:00 AM",
    imageKey: "realEvent3", isPublished: true,
    tickets: [
      { id: "nye-a", name: "Early Bird", price: 20000, capacity: 100, sold: 0 },
      { id: "nye-b", name: "Standard Entry", price: 25000, capacity: 200, sold: 0 },
      { id: "nye-c", name: "VIP Table (4 Persons)", price: 100000, capacity: 15, sold: 0 },
    ],
  },
];

// ==========================================
// ROOMS
// ==========================================
export const fetchRooms = async () => {
  try {
    const res = await fetch(`${API_URL}/rooms`);
    if (!res.ok) throw new Error("Failed to fetch rooms");
    const data = await res.json();
    if (!data || data.length === 0) throw new Error("Empty");
    return data;
  } catch (err) {
    console.warn("Using fallback rooms:", err.message);
    return fallbackRooms;
  }
};

export const fetchRoomBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_URL}/rooms/${slug}`);
    if (!res.ok) throw new Error("Room not found");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback room:", err.message);
    return fallbackRooms.find((r) => r.slug === slug) || fallbackRooms[0];
  }
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
  try {
    const res = await fetch(`${API_URL}/events`);
    if (!res.ok) throw new Error("Failed to fetch events");
    const data = await res.json();
    if (!data || data.length === 0) throw new Error("Empty");
    return data;
  } catch (err) {
    console.warn("Using fallback events:", err.message);
    return fallbackEvents;
  }
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
  try {
    const res = await fetch(`${API_URL}/events/${id}`);
    if (!res.ok) throw new Error("Event not found");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback event:", err.message);
    return fallbackEvents.find((e) => e.id === id) || fallbackEvents[0];
  }
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