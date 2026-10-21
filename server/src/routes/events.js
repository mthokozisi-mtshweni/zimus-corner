const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/client");

// GET all published events
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: { isPublished: true },
      include: {
        tickets: true, // Fetch the ticket tiers automatically
      },
    });
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

// GET a single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: { tickets: true },
    });
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch event." });
  }
});

module.exports = router;