require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/user"); // ✅ Import new User model

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "0280c3b16af39b694bedc2905b1be47177f8501649a1bd056c5d5788826fb0b29ec4f4fa153932f0f76dd6eb2d10ad9e1d349b3850f0707f86a966b642d1ca50";

// **Register User**
app.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, password: hashedPassword, role });
    res.status(201).json({ message: "User registered successfully!", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// **Login User**
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ token, role: user.role });
});

// **Protected Admin Route**
app.get("/admin", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json({ message: "Welcome Admin!" });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// **Protected User Profile**
app.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    res.json({ username: user.username });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// **Sync Database & Start Server**
// User.sync({ force: true }).then(() => {
//   app.listen(5000, () => console.log("Server running on port 5000"));
// });
app.listen(5000, () => console.log("Server running on port 5000"));
