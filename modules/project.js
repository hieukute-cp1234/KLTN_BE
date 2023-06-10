import { Schema, model } from "mongoose";
import { configSchema } from "../configs/module.js";

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    description: {
      type: String,
      default: "",
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
    status: {
      type: Number,
      default: 1,
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
  },
  configSchema
);

export default model("projects", ProjectSchema);
