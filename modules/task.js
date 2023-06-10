import { Schema, model } from "mongoose";
import { configSchema } from "../configs/module.js";

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    mention: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: Number,
      default: 1,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "project",
    },
    processStep: {
      type: Schema.Types.ObjectId,
      ref: "nodes",
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

export default model("tasks", TaskSchema);
