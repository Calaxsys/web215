import express from "express";
import CollectionLog from "../models/CollectionLog.js";

const router = express.Router();

/* ==========================
   GET all items
========================== */
router.get("/", async (req, res) => {
  try {
    const logs = await CollectionLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching logs" });
  }
});

/* ==========================
   POST create new item
========================== */
router.post("/", async (req, res) => {
  try {
    const newItem = new CollectionLog({
      itemName: req.body.itemName,
      amount: req.body.amount || 0,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: "Error adding item" });
  }
});

/* ==========================
   PATCH update amount manually
========================== */
router.patch("/:id", async (req, res) => {
  try {
    const updated = await CollectionLog.findByIdAndUpdate(
      req.params.id,
      { amount: req.body.amount },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating item amount" });
  }
});

/* ==========================
   PATCH increase amount (+1)
========================== */
router.patch("/:id/increase", async (req, res) => {
  try {
    const updated = await CollectionLog.findByIdAndUpdate(
      req.params.id,
      { $inc: { amount: 1 } },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error increasing amount" });
  }
});

/* ==========================
   DELETE remove item
========================== */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await CollectionLog.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

export default router;
