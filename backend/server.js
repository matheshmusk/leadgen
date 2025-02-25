const jwt = require("jsonwebtoken"); // Add this line at the top

const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware
app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

// Utility function for querying the database with promises
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};
// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Received login request:", req.body); // Debugging

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Fetch the user from the database
    const userResult = await query("SELECT * FROM users WHERE email = ?", [email]);

    if (userResult.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = userResult[0]; // Extract user object

    console.log("User found in DB:", user); // Debugging

    // Check if password exists in the database
    if (!user.password) {
      console.error("Error: User has no password stored in DB");
      return res.status(500).json({ error: "Server error. Please try again later." });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});



// Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, phone, dob, password } = req.body;

    console.log("Signup request received:", req.body); // Debugging

    if (!name || !email || !phone || !dob || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await query("INSERT INTO users (name, email, phone, dob, password) VALUES (?, ?, ?, ?, ?)", 
               [name, email, phone, dob, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
