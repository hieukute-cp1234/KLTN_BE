import { Schema, model } from "mongoose";

const ProcessSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: "",
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "roles",
    },
  ],
  project: [
    {
      type: Schema.Types.ObjectId,
      ref: "projects",
    },
  ],
  status: {
    type: Number,
    default: 1,
  },
  publish: {
    type: Number,
    default: 1,
  },
  createByUser: {
    type: Schema.Types.ObjectId,
  },
  nodes: [
    {
      type: Schema.Types.ObjectId,
      ref: "nodes",
    },
  ],
  edges: [
    {
      type: Schema.Types.ObjectId,
      ref: "edges",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("process", ProcessSchema);
