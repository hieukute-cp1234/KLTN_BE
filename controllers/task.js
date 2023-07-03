import taskModule from "../modules/task.js";
import projectModule from "../modules/project.js";
import userModule from "../modules/users.js";
import messageModule from "../modules/messages.js";
import { response, sendMail } from "../helpers/index.js";
import { STATUS_CODE } from "../constants/index.js";

const fetchTaskByUser = async (req, res) => {
  try {
    const { projectId, userId } = req.query;

    const conditions = {};

    if (projectId) conditions.project = projectId;
    if (userId) conditions.mention = userId;

    const tasks = await taskModule
      .find(conditions)
      .populate("mention", ["userName", "email"])
      .populate("manager", ["email"]);

    return res.status(STATUS_CODE.SUCCESS).json(response(tasks, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const fetchTaskById = async (req, res) => {
  try {
    const currentTask = await taskModule
      .findOne({ _id: req.params.id })
      .populate("mention", ["userName", "email"])
      .populate("manager", ["email"])
      .populate("project", ["name"])
      .populate("processStep", ["title"])
      .populate({
        path: "messages",
        populate: [{ path: "createByUser" }],
      });

    return res.status(STATUS_CODE.SUCCESS).json(response(currentTask, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const createTask = async (req, res) => {
  try {
    const { project, mention, type, name } = req.body;

    let typeTask = "Task";
    if (type === 2) typeTask = "Issue";
    if (type === 3) typeTask = "Bug";

    const newText = `${typeTask} created by ${req.email}`;

    const currentMessage = {
      text: newText,
      type: "text",
      files: [],
      createByUser: req.user,
    };

    const newMessage = await messageModule.create(currentMessage);

    const newTask = {
      ...req.body,
      manager: req.user,
      status: 1,
      messages: [newMessage.id],
    };

    const result = await taskModule.create(newTask);
    const projectCurrent = await projectModule.findOne({ _id: project });

    await projectModule.findByIdAndUpdate(project, {
      tasks: [...projectCurrent.tasks, result.id],
    });

    const userSelected = await userModule.findOne({ _id: mention });
    const userAssign = await userModule.findOne({ _id: req.user });

    await userModule.findByIdAndUpdate(mention, {
      tasks: [...userSelected.tasks, result.id],
    });

    sendMail({
      emailFrom: userAssign.email,
      emailTo: userSelected.email,
      content: `<p>${typeTask} <a href="http://localhost:3000/user/my-task/${result.id}">${name}</a> created by ${userAssign.email} and assign for you</p>`,
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
    const result = await taskModule
      .findByIdAndUpdate(req.params.id, {
        ...req.body,
      })
      .populate("manager", ["email"]);

    const userAssign = await userModule.findOne({ _id: req.user });

    let typeTask = "Task";
    if (result.type === 2) typeTask = "Issue";
    if (result.type === 3) typeTask = "Bug";

    const newText = `${typeTask} changed by ${req.email}`;

    const currentMessage = {
      text: newText,
      type: "text",
      files: [],
      createByUser: req.user,
    };

    const newMessage = await messageModule.create(currentMessage);

    await taskModule.findByIdAndUpdate(req.params.id, {
      messages: [...result.messages, newMessage.id],
    });

    sendMail({
      emailFrom: result.manager.email,
      emailTo: userAssign.email,
      content: `<p>${typeTask} <a href="http://localhost:3000/user/my-task">${result.name}</a> updated by ${result.manager.email}</p>`,
    });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(newMessage, "Update project success!"));
  } catch (error) {
    console.log(error)
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
    const result = await taskModule
      .findByIdAndUpdate(req.params.id, {
        status: status,
      })
      .populate("manager", ["email"]);

    const userAssign = await userModule.findOne({ _id: req.user });

    let typeTask = "Task";
    if (result.type === 2) typeTask = "Issue";
    if (result.type === 3) typeTask = "Bug";

    const statusTask = (status) => {
      switch (status) {
        case 1:
          return "Open";
        case 2:
          return "Inprogress";
        case 3:
          return "Verify";
        default:
          return "Close";
      }
    };

    const messageUpdateStatus = `${
      userAssign.email
    } changed status to ${statusTask(status)}`;

    const currentMessage = {
      text: messageUpdateStatus,
      type: "text",
      files: [],
      createByUser: userAssign.id,
    };

    const newMessage = await messageModule.create(currentMessage);
    await taskModule.findByIdAndUpdate(req.params.id, {
      messages: [...result.messages, newMessage.id],
    });

    sendMail({
      emailFrom: userAssign.email,
      emailTo: result.manager.email,
      content: `<p>Status ${typeTask} <a href="http://localhost:3000/user/my-task/${
        req.params.id
      }">${result.name}</a> is changed ${statusTask(status)} by ${
        userAssign.email
      }</p>`,
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
  fetchTaskById,
};
