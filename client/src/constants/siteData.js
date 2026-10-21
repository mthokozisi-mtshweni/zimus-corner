// ============================================================
// ZIMU'S CORNER — VERIFIED BUSINESS DATA
// Source: Owner-provided information + confirmed resort assets.
// Areas marked "PENDING" must not be published until confirmed.
// ============================================================

export const resortInfo = {
  name: "Zimu's Corner Lifestyle Resort",
  shortName: "Zimu's Corner",
  location: "Tweefontein, Mpumalanga, South Africa",
  tagline: "Your Escape. Your Vibe.",
  description:
    "A vibrant family-friendly lifestyle resort in Tweefontein, Mpumalanga. Enjoy multiple pools, braai areas, gardens, and entertainment for the whole family.",
};

export const dayVisitPricing = [
  { label: "Adults", price: "R60", note: "Day visit entry" },
  { label: "Kids", price: "R30", note: "Day visit entry" },
  { label: "Cooler Box", price: "R80", note: "Bring your own refreshments" },
];

export const includedFacilities = [
  { name: "Multiple Swimming Pools", icon: "waves" },
  { name: "Private Jacuzzis", icon: "droplets" },
  { name: "Braai (Shisa Nyama) Areas", icon: "flame" },
  { name: "Jumping Castle", icon: "castle" },
  { name: "Trampoline", icon: "up" },
  { name: "Children's Playground", icon: "play" },
  { name: "Music & Entertainment", icon: "music" },
  { name: "Beauty Spa Services", icon: "sparkles" },
  { name: "Gardens & Relaxation Areas", icon: "leaf" },
  { name: "Event Hosting Spaces", icon: "calendar" },
];

export const experiences = [
  {
    title: "Sip & Swim Parties",
    tag: "Weekend Vibes",
    description: "DJs, live music, and poolside energy. Our signature Sip & Swim parties are the ultimate weekend social experience. Enjoy premium drinks, exclusive VIP sections, and the best Amapiano and Afrobeats.",
    imageKeys: ["realEvent1", "pool1", "realEvent2"], // Multiple images!
  },
  {
    title: "Braai Gatherings",
    tag: "Shisa Nyama",
    description: "Bring your crew for a classic South African shisa nyama. Our dedicated braai areas are perfect for families and friends to gather, cook, and enjoy the outdoors in our lush gardens.",
    imageKeys: ["realEvent2", "garden1", "realEvent3"],
  },
  {
    title: "Family Fun Days",
    tag: "All Ages",
    description: "Jumping castles, trampolines, and a dedicated children's playground. Our resort is designed for family bonding, offering a safe and exciting environment for kids while parents relax.",
    imageKeys: ["realEvent3", "pool2", "realRoom1"],
  },
  {
    title: "Weddings & Private Events",
    tag: "Exclusive Hire",
    description: "Host your most important moments with us. From weddings to corporate mixers, our beautiful gardens and poolside venues provide a breathtaking backdrop for any celebration.",
    imageKeys: ["realRoom1", "pool3", "garden1"],
  },
];

export const galleryImages = [
  { key: "pool1", alt: "Main pool with water feature and shaded seating area" },
  { key: "garden1", alt: "Garden area with umbrellas and braai tables" },
  { key: "pool2", alt: "Second pool area with palm tree and loungers" },
  { key: "pool3", alt: "Branded pool wall with waterfall feature" },
];

// PENDING VERIFICATION — do not publish until confirmed by the owner
export const pendingContact = {
  phone: null,        // e.g. "+27 XX XXX XXXX"
  whatsapp: null,     // e.g. "27XXXXXXXXX"
  email: null,        // e.g. "info@zimucorner.co.za"
  address: "Tweefontein, Mpumalanga",
};



// ⚠️ DEVELOPMENT FIXTURES ONLY - Replace with real verified Google/Facebook reviews before launch.
export const guestReviews = [
  {
    name: "Development Fixture",
    location: "Verified Guest",
    quote: "This is a placeholder review. Replace this text with a real quote from the resort's Google or Facebook page. It will look beautiful once populated.",
    rating: 5,
  },
  {
    name: "Development Fixture",
    location: "Weekend Visitor",
    quote: "The pools and braai areas are fantastic. The kids loved the jumping castle. Replace this with a real guest experience.",
    rating: 5,
  },
  {
    name: "Development Fixture",
    location: "Event Planner",
    quote: "Hosted a family gathering here. The garden setup and music created a perfect vibe. Replace this with a real guest experience.",
    rating: 5,
  }
];

// ⚠️ DEVELOPMENT FIXTURES ONLY
// Replace "Rates TBC" with real prices and update amenities when verified.
export const roomTypes = [
  {
    slug: "lifestyle-getaway",
    name: "Lifestyle Getaway",
    tag: "Weekend Stay",
    price: "Rates TBC",
    period: "per night",
    images: ["pool1", "garden1", "pool2"], // References to keys in imageImports
    description: "Our signature weekend escape. Enjoy full access to the resort's premium amenities, including multiple pools, braai areas, and our private jacuzzi.",
    features: ["Access to Pools", "Braai Area", "Private Jacuzzi", "Breakfast Included"],
    maxGuests: 2,
  },
  {
    slug: "group-event-stay",
    name: "Group & Event Stay",
    tag: "Group Booking",
    price: "Rates TBC",
    period: "custom quote",
    images: ["pool3", "pool2", "pool1"],
    description: "Perfect for wedding parties and group celebrations. Combine multiple rooms with exclusive access to our event spaces and entertainment zones.",
    features: ["Event Space", "Multiple Rooms", "Beauty Spa", "Music & DJ"],
    maxGuests: 10,
  },
  {
    slug: "couples-retreat",
    name: "Couples Retreat",
    tag: "Romantic Escape",
    price: "Rates TBC",
    period: "per night",
    images: ["garden1", "pool3", "pool2"],
    description: "A private, intimate escape designed for two. Unwind in your private jacuzzi, enjoy spa services, and take a sunset stroll through our lush gardens.",
    features: ["Private Jacuzzi", "Spa Services", "Pool Access", "Romantic Setup"],
    maxGuests: 2,
  },
];

// ⚠️ DEVELOPMENT FIXTURES ONLY
// Replace with verified event details and real ticket prices before launch.
export const upcomingEvents = [
  {
    id: "sip-and-swim",
    title: "DEV FIXTURE — Sip & Swim Party",
    date: "Saturday, 25th December",
    time: "12:00 PM - Late",
    description: "Join us for our seasonal Sip & Swim party featuring live DJs, poolside vibes, and our famous braai area.",
    imageKey: "pool1",
    status: "Upcoming",
    tickets: [
      { id: "gen-adult", name: "General Access (Adult)", price: 150, description: "Standard entry for 1 Adult" },
      { id: "gen-child", name: "General Access (Child)", price: 80, description: "Standard entry for 1 Child (Ages 3-12)" },
      { id: "vip-adult", name: "VIP Poolside (Adult)", price: 350, description: "VIP Lounge + Welcome Drink" },
      { id: "cooler", name: "Cooler Box Pass", price: 80, description: "Bring your own cooler box" },
    ]
  },
  {
    id: "family-braai",
    title: "DEV FIXTURE — Sunday Family Braai",
    date: "Sunday, 26th December",
    time: "10:00 AM - 6:00 PM",
    description: "Bring the whole family for a relaxing day of swimming, jumping castles, and outdoor music.",
    imageKey: "garden1",
    status: "Upcoming",
    tickets: [
      { id: "adult-pass", name: "Adult Day Pass", price: 60, description: "Standard entry for 1 Adult" },
      { id: "child-pass", name: "Kids Day Pass", price: 30, description: "Standard entry for 1 Child (Ages 3-12)" },
      { id: "cooler", name: "Cooler Box Pass", price: 80, description: "Bring your own cooler box" },
    ]
  },
  {
    id: "nye-celebration",
    title: "DEV FIXTURE — New Year's Eve Celebration",
    date: "Friday, 31st December",
    time: "8:00 PM - 2:00 AM",
    description: "Ring in the new year with us! Live performances, special drinks, and a spectacular poolside countdown.",
    imageKey: "pool2",
    status: "Limited Tickets",
    tickets: [
      { id: "early-bird", name: "Early Bird", price: 200, description: "Limited availability" },
      { id: "standard", name: "Standard Entry", price: 250, description: "Standard entry" },
      { id: "vip-table", name: "VIP Table (4 Persons)", price: 1000, description: "Table for 4 + Bottle Service" },
    ]
  }
];


// HOMEPAGE EXPERIENCES (HOVER VIDEOS)
export const homeExperiences = [
  {
    title: "The Pub & Lounge",
    tag: "Chill & Unwind",
    description: "Grab a cold drink, watch the game, and enjoy the vibrant atmosphere of our on-site pub.",
    imageKey: "pic11", // Fallback image
    videoUrl: "/pub.mp4", // Replace with your pub video
  },
  {
    title: "Luxury Rooms",
    tag: "Stay With Us",
    description: "Retreat to comfort. Our premium rooms are designed for ultimate relaxation after a long day.",
    imageKey: "realRoom2",
    videoUrl: "room.mp4", // Replace with your room video
  },
  {
    title: "Day Visits & Swimming",
    tag: "Cool Off",
    description: "Dive into our multiple crystal-clear pools. The perfect family day out in the Mpumalanga sun.",
    imageKey: "pic8",
    videoUrl: "/dayVisit.mp4", // Replace with your pool video
  },
  {
    title: "Live Events",
    tag: "Vibe With Us",
    description: "Experience unforgettable weekends with live DJs, Sip & Swim parties, and exclusive events.",
    imageKey: "pic13",
    videoUrl: "eventVideo.mp4", // Replace with your event video
  }
];