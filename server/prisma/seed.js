const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Clear existing data
  await prisma.ticketOrderItem.deleteMany();
  await prisma.ticketOrder.deleteMany();
  await prisma.ticketType.deleteMany();
  await prisma.event.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.roomType.deleteMany();

  // 2. Seed Rooms
  await prisma.roomType.createMany({
    data: [
      {
        name: "Lifestyle Getaway",
        slug: "lifestyle-getaway",
        description: "Our signature weekend escape. Enjoy full access to the resort's premium amenities, including multiple pools, braai areas, and our private jacuzzi.",
        price: 150000, 
        capacity: 2,
        inventory: 5,
        imageKeys: ["realRoom1", "realRoom2", "realRoom3"],
        isPublished: true,
      },
      {
        name: "Group & Event Stay",
        slug: "group-event-stay",
        description: "Perfect for wedding parties and group celebrations. Combine multiple rooms with exclusive access to our event spaces and entertainment zones.",
        price: 350000, 
        capacity: 10,
        inventory: 2,
        imageKeys: ["realRoom4", "realRoom5", "realRoom6"],
        isPublished: true,
      },
      {
        name: "Couples Retreat",
        slug: "couples-retreat",
        description: "A private, intimate escape designed for two. Unwind in your private jacuzzi, enjoy spa services, and take a sunset stroll through our lush gardens.",
        price: 180000, 
        capacity: 2,
        inventory: 3,
        imageKeys: ["realRoom2", "realRoom5", "realRoom1"],
        isPublished: true,
      },
    ],
  });

  // 3. Seed Events
  await prisma.event.create({
    data: {
      title: "Sip & Swim Party",
      description: "Join us for our seasonal Sip & Swim party featuring live DJs, poolside vibes, and our famous braai area.",
      date: "Saturday, 25th December",
      time: "12:00 PM - Late",
      imageKey: "realEvent1",
      isPublished: true,
      tickets: {
        create: [
          { name: "General Access (Adult)", price: 15000, capacity: 100 },
          { name: "General Access (Child)", price: 8000, capacity: 50 },
          { name: "VIP Poolside (Adult)", price: 35000, capacity: 20 },
          { name: "Cooler Box Pass", price: 8000, capacity: 100 },
        ],
      },
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });