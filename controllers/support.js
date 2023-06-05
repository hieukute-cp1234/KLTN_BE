import mongoose from "mongoose";
import { response } from "../helpers/index.js";
import { STATUS_CODE } from "../constants/index.js";

const getRandomId = (_req, res) => {
  try {
    const newId = mongoose.Types.ObjectId();
    return res.status(200).json(response(newId, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

export default { getRandomId };
