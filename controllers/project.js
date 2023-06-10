import projectModule from "../modules/project.js";
import { response } from "../helpers/index.js";
import { STATUS_CODE } from "../constants/index.js";

const fetchAllProject = async (req, res) => {
  try {
    const result = await projectModule.find({});
    return res.status(STATUS_CODE.SUCCESS).json(response(result, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const fetchProjectById = async (req, res) => {
  try {
    const result = await projectModule.findOne({ _id: req.params.id });
    return res.status(STATUS_CODE.SUCCESS).json(response(result, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const checkProject = await projectModule.findOne({ name });

    if (checkProject) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "project da ton tai!"));
    }

    const newProject = { ...req.body, tasks: [], manager: req.user, status: 1 };

    const result = await projectModule.create(newProject);

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "Create project success!"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const updateProject = async (req, res) => {
  try {
    const { name } = req.body;
    const checkProject = await projectModule.findOne({ name });

    if (checkProject) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "project da ton tai!"));
    }

    const result = await projectModule.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "Update project success!"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectDeleted = await projectModule.deleteOne({
      _id: req.params.id,
    });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(projectDeleted, "Delete process success!"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

export default {
  fetchAllProject,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject,
};
