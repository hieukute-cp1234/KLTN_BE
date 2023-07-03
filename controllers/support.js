import mongoose from "mongoose";
import moduleMessage from "../modules/messages.js";
import moduleDocument from "../modules/documents.js";
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

const uploadFiles = async (req, res) => {
  try {
    const fileName = req.files.map((file) => file.filename);
    return res.status(200).json(response(fileName, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

export default { getRandomId, uploadFiles };
