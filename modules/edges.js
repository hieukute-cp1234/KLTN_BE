import { Schema, model } from "mongoose";

const EdgeSchema = new Schema({
  source: {
    type: Schema.Types.ObjectId,
    ref: "nodes",
  },
  target: {
    type: Schema.Types.ObjectId,
    ref: "nodes",
  },
  label: {
    type: String,
    trim: true,
    default: "",
  },
  type: {
    type: String,
    default: "step",
  },
  markerEnd: {
    type: Object,
    default: { type: 1 },
  },
  process: {
    type: Schema.Types.ObjectId,
    ref: "process",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("edges", EdgeSchema);
