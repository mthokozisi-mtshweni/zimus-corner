const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/client");
const crypto = require("crypto");

// POST: Create a new room booking
router.post("/", async (req, res) => {
  const { roomTypeId, checkIn, checkOut, guestName, guestEmail, guestPhone } = req.body;

  try {
    // 1. Validate Dates
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (start >= end) {
      return res.status(400).json({ error: "Check-out date must be after check-in date." });
    }

    // 2. Fetch the Room Type
    const roomType = await prisma.roomType.findUnique({ where: { id: roomTypeId } });
    if (!roomType) return res.status(404).json({ error: "Room type not found." });

    // 3. Check Availability (The Smart Part)
    // We look for any existing bookings for this room type that overlap with the requested dates.
    // Overlap logic: (NewCheckIn < ExistingCheckOut) AND (NewCheckOut > ExistingCheckIn)
    const overlappingBookings = await prisma.booking.count({
      where: {
        roomTypeId: roomTypeId,
        status: { in: ["PENDING", "CONFIRMED"] },
        AND: [
          { checkIn: { lt: end } },
          { checkOut: { gt: start } }
        ]
      }
    });

    // If the number of overlapping bookings is greater than or equal to the physical inventory, reject.
    if (overlappingBookings >= roomType.inventory) {
      return res.status(400).json({ error: "Sorry, this room type is fully booked for those dates." });
    }

    // 4. Calculate Price (Server-side calculation)
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * roomType.price;

    // 5. Generate a unique reference
    const reference = `ZIM-ROOM-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

    // 6. Create the Booking
    const booking = await prisma.booking.create({
      data: {
        reference,
        guestName,
        guestEmail,
        guestPhone,
        checkIn: start,
        checkOut: end,
        totalAmount,
        roomTypeId,
        status: "PENDING", // Will change to CONFIRMED after payment
      },
    });

    res.status(201).json({ 
      message: "Booking request created successfully.", 
      booking 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create booking." });
  }
});

// GET a booking by reference
router.get("/:reference", async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { reference: req.params.reference },
      include: { roomType: true }
    });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

module.exports = router;