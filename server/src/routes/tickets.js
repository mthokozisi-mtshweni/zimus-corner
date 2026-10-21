const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/client");
const crypto = require("crypto");

// POST: Buy event tickets
router.post("/", async (req, res) => {
  const { eventId, guestName, guestEmail, guestPhone, items } = req.body;
  // 'items' should look like: [{ ticketTypeId: "uuid", quantity: 2 }, ...]

  try {
    // 1. Validate that items exist
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No tickets selected." });
    }

    // 2. Use a Prisma Transaction to ensure all-or-nothing
    const order = await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      // Loop through selected tickets
      for (const item of items) {
        // Fetch latest ticket data
        const ticketType = await tx.ticketType.findUnique({
          where: { id: item.ticketTypeId }
        });

        if (!ticketType) throw new Error(`Ticket type not found.`);

        // Check capacity
        const available = ticketType.capacity - ticketType.sold;
        if (item.quantity > available) {
          throw new Error(`Not enough tickets available for ${ticketType.name}. Only ${available} left.`);
        }

        // Calculate total (using DB price, not frontend)
        totalAmount += ticketType.price * item.quantity;

        // Prepare order item data
        orderItemsData.push({
          ticketTypeId: ticketType.id,
          quantity: item.quantity,
          priceAtSale: ticketType.price,
        });

        // Increment the 'sold' count immediately
        await tx.ticketType.update({
          where: { id: ticketType.id },
          data: { sold: { increment: item.quantity } }
        });
      }

      // Generate unique reference
      const reference = `ZIM-TIX-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

      // Create the main order
      const newOrder = await tx.ticketOrder.create({
        data: {
          reference,
          guestName,
          guestEmail,
          guestPhone,
          totalAmount,
          eventId,
          status: "PENDING",
          items: {
            create: orderItemsData
          }
        },
        include: { items: true } // Return the items in the response
      });

      return newOrder;
    });

    res.status(201).json({ 
      message: "Ticket order created successfully.", 
      order 
    });

  } catch (error) {
    console.error(error);
    // If the transaction fails (e.g., not enough tickets), it rolls back the sold counts automatically
    res.status(400).json({ error: error.message || "Failed to create ticket order." });
  }
});

// GET an order by reference
router.get("/:reference", async (req, res) => {
  try {
    const order = await prisma.ticketOrder.findUnique({
      where: { reference: req.params.reference },
      include: { 
        event: true,
        items: { include: { ticketType: true } } 
      }
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

module.exports = router;