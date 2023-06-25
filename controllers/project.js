import projectModule from "../modules/project.js";
import userModule from "../modules/users.js";
import { response, sendMail } from "../helpers/index.js";
import { STATUS_CODE } from "../constants/index.js";

const fetchAllProject = async (req, res) => {
  try {
    const { search } = req.query;

    const condition = {};

    if (search) condition.name = { $regex: search, $options: "i" };

    const result = await projectModule
      .find(condition)
      .populate("manager", ["userName", "email"]);
    return res.status(STATUS_CODE.SUCCESS).json(response(result, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const fetchProjectByUSer = async (req, res) => {
  try {
    const result = await projectModule.find({});
    const projectByUser = result.filter((project) =>
      project.members.includes(req.user)
    );
    return res.status(STATUS_CODE.SUCCESS).json(response(projectByUser, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const fetchProjectById = async (req, res) => {
  try {
    const result = await projectModule
      .findOne({ _id: req.params.id })
      .populate({
        path: "process",
        populate: [
          { path: "nodes" },
          { path: "edges" },
          { path: "createByUser" },
        ],
      })
      .populate("manager")
      .populate("members", ["userName", "email", "role"])
      .populate("documents")
      .exec();
    return res.status(STATUS_CODE.SUCCESS).json(response(result, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const createProject = async (req, res) => {
  try {
    const { name, members } = req.body;
    const checkProject = await projectModule.findOne({ name });

    if (checkProject) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "project da ton tai!"));
    }

    const newProject = { ...req.body, tasks: [], manager: req.user, status: 1 };

    const result = await projectModule.create(newProject);
    const userAssign = await userModule.findOne({ _id: req.user });

    const allMailMembers = [];
    const updateMember = members.map(async (user) => {
      const userSelected = await userModule.findOne({ _id: user });
      allMailMembers.push(userSelected.email);
      return userModule.findByIdAndUpdate(user, {
        project: [...userSelected.project, result.id],
      });
    });

    await Promise.all(updateMember);

    sendMail({
      emailFrom: userAssign.email,
      emailTo: allMailMembers,
      content: `<p>You have been added to the project <a href="http://localhost:3000/user/my-task">${result.name}</a> by ${userAssign.email}</p>`,
    });

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
    const projectSelect = await projectModule.findOne({ _id: req.params.id });
    const checkProject = await projectModule.findOne({ name });

    if (projectSelect.name !== name && checkProject) {
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
  fetchProjectByUSer,
};
