const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Updating images...");

  // 1. Update Rooms
  await prisma.roomType.update({
    where: { slug: "lifestyle-getaway" },
    data: { imageKeys: ["realRoom1", "realRoom2", "realRoom3"] }
  });

  await prisma.roomType.update({
    where: { slug: "group-event-stay" },
    data: { imageKeys: ["realRoom4", "realRoom5", "realRoom6"] }
  });

  await prisma.roomType.update({
    where: { slug: "couples-retreat" },
    data: { imageKeys: ["realRoom2", "realRoom5", "realRoom1"] }
  });

  // 2. Update Events
  // Find all events and update their image keys by index
  const events = await prisma.event.findMany({ orderBy: { createdAt: 'asc' } });
  
  if (events[0]) {
    await prisma.event.update({
      where: { id: events[0].id },
      data: { imageKey: "realEvent1" }
    });
  }
  if (events[1]) {
    await prisma.event.update({
      where: { id: events[1].id },
      data: { imageKey: "realEvent2" }
    });
  }
  if (events[2]) {
    await prisma.event.update({
      where: { id: events[2].id },
      data: { imageKey: "realEvent3" }
    });
  }

  console.log("✅ Images updated successfully in the database!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());