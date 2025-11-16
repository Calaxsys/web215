import "dotenv/config";
import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import collectionLog from "./routes/collectionLog.js";
import skillGoals from "./routes/skillGoals.js";


const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors());
app.use(express.json());

// Authentication temporarily disabled for testing
// TODO: Implement proper JWT or session-based authentication

const USER = "web215user";
const PASS = "LetMeIn!";

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USER && password === PASS) {
    return res.status(200).json({ message: "Login successful" });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// Auth middleware temporarily disabled for testing
app.use("/record", records);
app.use("/collection-log", collectionLog);
app.use("/skill-goals", skillGoals);

app.get("/", (req, res) => {
  res.send("RuneTrack 2.0 Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});