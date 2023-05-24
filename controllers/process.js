import process from "../modules/process.js";
import { response } from "../helpers/index.js";
import { STATUS_CODE } from "../constants/index.js";

const fetchAllProcess = async (req, res) => {
  try {
    const { userId, publish, status } = req.query;
    const condition = {};

    if (userId) condition.createByUser = userId;
    if (publish) condition.publish = publish;
    if (status) condition.status = status;

    const allProcess = await process.find(condition);

    return res.status(STATUS_CODE.SUCCESS).json(response(allProcess, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const fetchProcessById = async (req, res) => {
  try {
    const process = await process.findOne({ _id: req.params.id });

    if (!process) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "process khong ton tai!"));
    }

    return res.status(STATUS_CODE.SUCCESS).json(response(process, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const createProcess = async (req, res) => {
  try {
    const { name, description, listRole, project, nodes, edges, publish } =
      req.body;
    const checkProcess = await process.findOne({ name });

    if (checkProcess) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "process da ton tai!"));
    }

    const newProcess = {
      name: name,
      description: description || "",
      nodes: nodes || [],
      edges: edges || [],
      roles: listRole || [],
      project: project || [],
      createByUser: req.user,
      publish: publish || 1,
      status: 1,
    };

    const result = await process.create(newProcess);

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "tao process thanh cong"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const updateProcess = async (req, res) => {
  try {
    const { name } = req.body;
    const checkProcess = await process.findOne({ name });

    if (checkProcess) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "ten process da ton tai!"));
    }

    const result = await process.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "tao process thanh cong"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const copyProcess = async (req, res) => {
  try {
    const processById = process.findOne({ _id: req.params.id });

    if (!processById) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "process khong ton tai!"));
    }

    const newProcess = {
      name: `${processById.name} copy`,
      description: processById.description || "",
      nodes: processById.nodes || [],
      edges: processById.edges || [],
      publish: processById.publish || 1,
      roles: processById.listRole || [],
      createByUser: req.user,
      project: [],
      status: 1,
    };

    const result = await process.create(newProcess);
    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "tao process thanh cong"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const deleteProcess = async (req, res) => {
  try {
    const processDeleted = await process.deleteOne({
      _id: req.params.id,
    });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(processDeleted, "Delete process success!"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

export default {
  createProcess,
  updateProcess,
  copyProcess,
  deleteProcess,
  fetchAllProcess,
  fetchProcessById,
};
