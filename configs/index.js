import mongoose from "mongoose";
import { WEB_KEY } from "../constants/index.js";

//config default mongoose
mongoose.set("strictQuery", false);

const optionConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectMongooDB = async () => {
  try {
    await mongoose.connect(WEB_KEY, optionConfig);
    console.log("connect db successfully!");
  } catch (error) {
    console.log("connect db failue!", error);
    process.exit(1);
  }
};
