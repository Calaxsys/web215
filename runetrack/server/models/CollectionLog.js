import mongoose from "mongoose";

const collectionLogSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  boss: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  obtainedOn: { type: Date, default: Date.now },
});

export default mongoose.model("CollectionLog", collectionLogSchema);
