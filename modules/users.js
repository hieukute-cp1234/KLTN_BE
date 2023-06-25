import { Schema, SchemaType, model } from "mongoose";
import bcrypt from "bcrypt";
import { configSchema } from "../configs/module.js";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    birthday: {
      type: String,
      trim: true,
      default: null,
    },
    company: {
      type: String,
      trim: true,
      default: null,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    project: [
      {
        type: Schema.Types.ObjectId,
        ref: "projects",
      },
    ],
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
    processCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "process",
      },
    ],
    role: {
      type: Number,
      default: 1,
    },
    specialize: {
      type: Schema.Types.ObjectId,
      ref: "roles",
    },
    avatar: {
      type: String,
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

UserSchema.methods = {
  comparePass(pass) {
    return bcrypt.compare(pass, this.password);
  },
};

export default model("users", UserSchema);
