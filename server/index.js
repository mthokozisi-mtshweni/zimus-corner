const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRouter = require("./src/routes/auth");
const adminRouter = require("./src/routes/admin");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(helmet());
// Replace app.use(cors()); with this:
app.use(cors({
  origin: process.env.CLIENT_URL, // This will be your Vercel URL
  credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

// Import Routes
const roomsRouter = require("./src/routes/rooms");
const eventsRouter = require("./src/routes/events");
const bookingsRouter = require("./src/routes/bookings"); // <-- ADD THIS
const ticketsRouter = require("./src/routes/tickets");   // <-- ADD THIS

// Use Routes
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/tickets", ticketsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);

// Health Check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "success", message: "API is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});