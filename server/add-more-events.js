const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Adding more events...");

  const newEvents = [
    {
      title: "Friday Night Live DJ",
      description: "Kick off your weekend with the best local DJs spinning Afrobeats, Amapiano, and House. Pool is open late with special cocktail pricing.",
      date: "Friday, 15th November",
      time: "7:00 PM - 2:00 AM",
      imageKey: "realEvent1",
      isPublished: true,
      tickets: {
        create: [
          { name: "General Access (Adult)", price: 10000, capacity: 200 },
          { name: "VIP Table (4 Persons)", price: 80000, capacity: 15 },
        ],
      },
    },
    {
      title: "Kids Splash Day",
      description: "A full day dedicated to the little ones! Water slides, jumping castle, face painting, and free juice for all kids under 12.",
      date: "Saturday, 23rd November",
      time: "10:00 AM - 5:00 PM",
      imageKey: "realEvent2",
      isPublished: true,
      tickets: {
        create: [
          { name: "Child Entry (3-12)", price: 3000, capacity: 150 },
          { name: "Adult Entry", price: 6000, capacity: 150 },
          { name: "Cooler Box Pass", price: 8000, capacity: 100 },
        ],
      },
    },
    {
      title: "Gospel Sunday Brunch",
      description: "Soulful live gospel performances paired with a premium Sunday braai. Bring the family for a peaceful and uplifting afternoon.",
      date: "Sunday, 24th November",
      time: "11:00 AM - 4:00 PM",
      imageKey: "realEvent3",
      isPublished: true,
      tickets: {
        create: [
          { name: "General Entry (Adult)", price: 8000, capacity: 200 },
          { name: "Child Entry (3-12)", price: 4000, capacity: 100 },
        ],
      },
    },
    {
      title: "Year End Corporate Mixer",
      description: "An exclusive evening for corporate teams to unwind. Includes a welcome drink, live band, and networking sessions.",
      date: "Friday, 6th December",
      time: "6:00 PM - 11:00 PM",
      imageKey: "realEvent1",
      isPublished: true,
      tickets: {
        create: [
          { name: "Individual Pass", price: 25000, capacity: 100 },
          { name: "Team Table (8 Persons)", price: 180000, capacity: 10 },
        ],
      },
    },
  ];

  for (const event of newEvents) {
    await prisma.event.create({ data: event });
  }

  const total = await prisma.event.count();
  console.log(`✅ Total events in database: ${total}`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());