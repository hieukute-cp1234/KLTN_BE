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
  workflow: {
    type: Schema.Types.ObjectId,
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
