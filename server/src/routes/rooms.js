const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/client");

// =====================================================
// 1. SPECIFIC ROUTES (Must come first!)
// =====================================================

// GET: Search for available rooms
router.get("/search/availability", async (req, res) => {
  const { checkIn, checkOut, guests } = req.query;

  if (!checkIn || !checkOut) {
    return res.status(400).json({ error: "Dates required." });
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  try {
    const rooms = await prisma.roomType.findMany({
      where: { isPublished: true },
    });

    const results = await Promise.all(rooms.map(async (room) => {
      const overlapping = await prisma.booking.count({
        where: {
          roomTypeId: room.id,
          status: { in: ["PENDING", "CONFIRMED"] },
          AND: [{ checkIn: { lt: end } }, { checkOut: { gt: start } }]
        }
      });

      const isAvailable = overlapping < room.inventory;
      const capacityOk = guests ? parseInt(guests) <= room.capacity : true;

      return { 
        ...room, 
        isAvailable: isAvailable && capacityOk, 
        remaining: room.inventory - overlapping 
      };
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed." });
  }
});

// =====================================================
// 2. BASE ROUTE
// =====================================================

// GET: All published rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await prisma.roomType.findMany({
      where: { isPublished: true },
    });
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch rooms." });
  }
});

// =====================================================
// 3. DYNAMIC ROUTES (Must come last!)
// =====================================================

// GET: Check availability for a specific room
router.get("/:id/availability", async (req, res) => {
  const { id } = req.params;
  const { checkIn, checkOut } = req.query;

  if (!checkIn || !checkOut) {
    return res.status(400).json({ error: "Check-in and check-out dates are required." });
  }

  try {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (start >= end) {
      return res.status(400).json({ error: "Check-out must be after check-in." });
    }

    const roomType = await prisma.roomType.findUnique({ where: { id } });
    if (!roomType) return res.status(404).json({ error: "Room not found." });

    const overlappingBookings = await prisma.booking.count({
      where: {
        roomTypeId: id,
        status: { in: ["PENDING", "CONFIRMED"] },
        AND: [{ checkIn: { lt: end } }, { checkOut: { gt: start } }]
      }
    });

    const available = overlappingBookings < roomType.inventory;
    const remainingRooms = Math.max(0, roomType.inventory - overlappingBookings);

    res.json({ 
      available, 
      remainingRooms,
      totalInventory: roomType.inventory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check availability." });
  }
});

// GET: Get blocked dates for a specific room
router.get("/:id/blocked-dates", async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        roomTypeId: req.params.id,
        status: { in: ["PENDING", "CONFIRMED"] },
        checkOut: { gte: new Date() }
      },
      select: { checkIn: true, checkOut: true }
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch blocked dates." });
  }
});

// GET: Single room by slug (MUST BE LAST)
router.get("/:slug", async (req, res) => {
  try {
    const room = await prisma.roomType.findUnique({
      where: { slug: req.params.slug },
    });
    if (!room) {
      return res.status(404).json({ error: "Room not found." });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch room." });
  }
});

module.exports = router;