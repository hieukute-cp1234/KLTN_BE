import taskModule from "../modules/task.js";
import projectModule from "../modules/project.js";
import userModule from "../modules/users.js";
import { response } from "../helpers/index.js";
import { STATUS_CODE } from "../constants/index.js";

const fetchTaskByUser = async (req, res) => {
  try {
    const { projectId, userId } = req.query;

    const conditions = {};

    if (projectId) conditions.project = projectId;
    if (userId) conditions.mention = userId;

    const tasks = await taskModule
      .find(conditions)
      .populate("mention", ["userName", "email"]);

    return res.status(STATUS_CODE.SUCCESS).json(response(tasks, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = { ...req.body, manager: req.user, status: 1 };
    const result = await taskModule.create(newTask);

    const { project, mention } = req.body;

    const projectCurrent = await projectModule.findOne({ _id: project });

    await projectModule.findByIdAndUpdate(project, {
      tasks: [...projectCurrent.tasks, result.id],
    });

    const userSelected = await userModule.findOne({ _id: mention });

    await userModule.findByIdAndUpdate(mention, {
      tasks: [...userSelected.tasks, result.id],
    });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "Create task success!"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const updateTask = async (req, res) => {
  try {
    const result = await taskModule.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "Update project success!"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskDeleted = await taskModule.deleteOne({
      _id: req.params.id,
    });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(taskDeleted, "Delete process success!"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const updateStatusTask = async (req, res) => {
  try {
    const { status } = req.body;
    const result = await taskModule.findByIdAndUpdate(req.params.id, {
      status: status,
    });

    return res.status(STATUS_CODE.SUCCESS).json(response(result, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

export default {
  fetchTaskByUser,
  createTask,
  updateTask,
  deleteTask,
  updateStatusTask,
};
