import { Schema, model } from "mongoose";
import { configSchema } from "../configs/module.js";

const RoleSchema = new Schema(
  {
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
    code: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  configSchema
);

export default model("roles", RoleSchema);
