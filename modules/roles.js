import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: "",
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  level: {
    type: Number,
    default: 1,
  },
  type: {
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

export default model("roles", RoleSchema);
