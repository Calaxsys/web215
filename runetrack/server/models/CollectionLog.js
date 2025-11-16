import mongoose from "mongoose";

const CollectionLogSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  amount: { type: Number, default: 0 },
});

export default mongoose.model("CollectionLog", CollectionLogSchema);
