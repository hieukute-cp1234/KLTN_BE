import moduleDocument from "../modules/documents.js";
import moduleProject from "../modules/project.js";
import { response } from "../helpers/index.js";
import { STATUS_CODE } from "../constants/index.js";

const deleteDocument = async (req, res) => {
  try {
    const result = await moduleDocument.deleteOne({ _id: req.params.id });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "Delete document success!"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const updateDocument = async (req, res) => {
  try {
    const file = req.file;
    const current = await moduleDocument.findOne({ _id: req.params.id });

    await moduleDocument.findByIdAndUpdate(req.params.id, {
      ...req.body,
      file: file ? file.filename : current.file,
    });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(null, "Delete document success!"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const uploadFile = async (req, res) => {
  try {
    const { projectId, label, link } = req.body;
    const file = req.file;

    if (projectId) {
      const currentProject = await moduleProject.findOne({ _id: projectId });
      const newDocument = {
        label: label,
        file: file ? file.filename : "",
        link: link || "",
        type: file ? file.mimetype : "text",
        originName: file.originalname || "",
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

export default { deleteDocument, updateDocument, uploadFile };
