import express from "express";
import { connectToDB } from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all skill goals
router.get("/", async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("skillGoals");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching skill goals");
  }
});

// Get a single skill goal by ID
router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("skillGoals");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching skill goal");
  }
});

// Create a new skill goal
router.post("/", async (req, res) => {
  try {
    const db = await connectToDB();
    const newDocument = {
      goalDescription: req.body.goalDescription,
      completed: req.body.completed || false,
      createdAt: new Date(),
    };
    const collection = db.collection("skillGoals");
    const result = await collection.insertOne(newDocument);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding skill goal");
  }
});

// Update a skill goal by ID (mainly for toggling completion)
router.patch("/:id", async (req, res) => {
  try {
    const db = await connectToDB();
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        goalDescription: req.body.goalDescription,
        completed: req.body.completed,
      },
    };
    const collection = db.collection("skillGoals");
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating skill goal");
  }
});

// Delete a skill goal
router.delete("/:id", async (req, res) => {
  try {
    const db = await connectToDB();
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("skillGoals");
    const result = await collection.deleteOne(query);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting skill goal");
  }
});

export default router;
