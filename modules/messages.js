import { Schema, model } from "mongoose";
import { configSchema } from "../configs/module.js";

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      trim: true,
      default: "",
    },
    files: {
      type: Array,
      default: [],
    },
    createByUser: {
      type: Schema.Types.ObjectId,
      ref: "users",
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

export default model("messages", MessageSchema);
