import express from "express";
import CollectionLog from "../models/CollectionLog.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const logs = await CollectionLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching logs", err });
  }
});

router.post("/seed", async (req, res) => {
  try {
    const sampleData = [
      { itemName: "Abyssal Whip", boss: "Abyssal Demon", quantity: 1 },
      { itemName: "Dragon Pickaxe", boss: "King Black Dragon", quantity: 2 },
      { itemName: "Pet General Graardor", boss: "Bandos", quantity: 1 },
    ];

    await CollectionLog.deleteMany(); // clear existing data
    const inserted = await CollectionLog.insertMany(sampleData);

    res.json({ message: "Sample data seeded!", inserted });
  } catch (err) {
    res.status(500).json({ message: "Error seeding data", err });
  }
});

export default router;
