import { Schema, model } from "mongoose";
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
      maxLength: 255,
      minLength: 6,
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
    project: {
      type: Array,
      default: [],
    },
    role: {
      type: Number,
      default: 1,
    },
    avater: {
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
