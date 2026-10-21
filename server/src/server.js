
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    service: "Zimu's Corner Lifestyle Resort API",
    status: "running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "Zimu's Corner API",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Zimu's Corner API running at http://localhost:${PORT}`);
});
