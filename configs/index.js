import mongoose from "mongoose";
import { DB_KEY } from "../constants/index.js";

//config default mongoose
mongoose.set("strictQuery", false);

const optionConfig = {
  // useFindAndModify: false,
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectMongooDB = async () => {
  try {
    await mongoose.connect(DB_KEY, optionConfig);
    console.log("connect db successfully!");
  } catch (error) {
    console.log("connect db failue!", error);
    process.exit(1);
  }
};
