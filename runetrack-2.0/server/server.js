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

let isAuthenticated = false;

const USER = "web215user";
const PASS = "LetMeIn!";

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USER && password === PASS) {
     isAuthenticated = true;
    return res.status(200).json({ message: "Login successful" });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

function auth(req, res, next) {
  if (!isAuthenticated) {
    return res.status(403).json({ message: "Not authorized" });
  }
  next();
}

app.use("/record", auth, records);
app.use("/collection-log", auth, collectionLog);
app.use("/skill-goals", auth, skillGoals);

app.get("/", (req, res) => {
  res.send("RuneTrack 2.0 Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});