import express from "express";
import { connectToDB } from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all collection log items
router.get("/", async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("collectionLog");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching collection log items");
  }
});

// Get a single collection log item by ID
router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("collectionLog");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching collection log item");
  }
});

// Create a new collection log item
router.post("/", async (req, res) => {
  try {
    const db = await connectToDB();
    const newDocument = {
      itemName: req.body.itemName,
      source: req.body.source,
      amountCollected: req.body.amountCollected,
      createdAt: new Date(),
    };
    const collection = db.collection("collectionLog");
    const result = await collection.insertOne(newDocument);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding collection log item");
  }
});

// Update a collection log item by ID
router.patch("/:id", async (req, res) => {
  try {
    const db = await connectToDB();
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        itemName: req.body.itemName,
        source: req.body.source,
        amountCollected: req.body.amountCollected,
      },
    };
    const collection = db.collection("collectionLog");
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating collection log item");
  }
});

// Delete a collection log item
router.delete("/:id", async (req, res) => {
  try {
    const db = await connectToDB();
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("collectionLog");
    const result = await collection.deleteOne(query);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting collection log item");
  }
});

export default router;
