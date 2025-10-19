// db.js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export async function connectToDB() {
  if (db) return db; // reuse existing connection

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB");
    db = client.db("employees");
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}

export { db };