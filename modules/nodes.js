import { Schema, model } from "mongoose";
import { configSchema } from "../configs/module.js";

const NodeSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "working",
    },
    type: {
      type: String,
      trim: true,
      default: "input",
    },
    background: {
      type: String,
      trim: true,
      default: "#ffffff",
    },
    role: {
      type: String,
      trim: true,
      default: "",
    },
    input: {
      type: String,
      trim: true,
      default: "",
    },
    output: {
      type: String,
      trim: true,
      default: "",
    },
    checkList: {
      type: Array,
      default: [],
    },
    effortNumber: {
      type: Number,
      default: 1,
    },
    effortType: {
      type: Number,
      default: 1,
    },
    position: {
      type: Object,
      default: { x: 500, y: 500 },
    },
    status: {
      type: Number,
      default: 1,
    },
    data: {
      type: Object,
      default: {},
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

export default model("nodes", NodeSchema);
