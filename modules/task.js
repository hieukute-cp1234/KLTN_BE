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
      ref: "projects",
    },
    processStep: {
      type: Schema.Types.ObjectId,
      ref: "nodes",
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    effort: {
      type: Number,
      default: 1,
    },
    effortType: {
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
  },
  configSchema
);

export default model("tasks", TaskSchema);
