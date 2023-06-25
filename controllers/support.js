import mongoose from "mongoose";
import moduleProject from "../modules/project.js";
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

const uploadFile = async (req, res) => {
  try {
    const { projectId, nodeId, taskId, type, label, link } = req.body;
    const file = req.file;

    if (projectId) {
      const currentProject = await moduleProject.findOne({ _id: projectId });
      const newDocument = {
        label: label,
        file: file ? file.filename : "",
        link: link || "",
        type: file ? file.mimetype : "text",
      };

      const result = await moduleDocument.create(newDocument);

      await moduleProject.findByIdAndUpdate(projectId, {
        documents: [...currentProject.documents, result.id],
      });

      return res.status(200).json(response({ document: result }, null));
    }
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

export default { getRandomId, uploadFile };
