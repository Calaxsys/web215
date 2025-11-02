import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors());
app.use(express.json());

const USER = "web215user";
const PASS = "LetMeIn!";

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USER && password === PASS) {
    return res.status(200).json({ message: "Login successful" });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

app.get("/", (req, res) => {
  res.send("WEB215 App Backend Running");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});