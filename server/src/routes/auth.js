const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/client");

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-zimu-key-change-in-production";

// POST: Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials." });

    // 2. Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid credentials." });

    // 3. Create Token
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ 
      message: "Login successful", 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during login." });
  }
});

module.exports = router;