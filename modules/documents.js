import { Schema, model } from "mongoose";
import { configSchema } from "../configs/module.js";

const DocumentSchema = new Schema(
  {
    label: {
      type: String,
      trim: true,
      default: "",
    },
    originName: {
      type: String,
      default: "",
    },
    file: {
      type: String,
      trim: true,
      default: "",
    },
    link: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      trim: true,
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

export default model("documents", DocumentSchema);
