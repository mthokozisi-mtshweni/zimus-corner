const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/client");
const authMiddleware = require("../middleware/auth");

// Apply the auth middleware to ALL routes in this file
router.use(authMiddleware);

// GET: Dashboard Stats
router.get("/stats", async (req, res) => {
  try {
    const totalBookings = await prisma.booking.count();
    const totalOrders = await prisma.ticketOrder.count();
    
    // Calculate total revenue (sum of totalAmount for confirmed/paid items)
    const bookingRevenue = await prisma.booking.aggregate({
      _sum: { totalAmount: true },
      where: { status: { not: "CANCELLED" } }
    });
    const orderRevenue = await prisma.ticketOrder.aggregate({
      _sum: { totalAmount: true },
      where: { status: { not: "CANCELLED" } }
    });

    res.json({
      totalBookings,
      totalOrders,
      totalRevenue: (bookingRevenue._sum.totalAmount || 0) + (orderRevenue._sum.totalAmount || 0)
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats." });
  }
});

// GET: All Room Bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { roomType: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
});

// GET: All Ticket Orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await prisma.ticketOrder.findMany({
      include: { 
        event: true,
        items: { include: { ticketType: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

module.exports = router;