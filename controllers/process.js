import processMobule from "../modules/process.js";
import nodeModule from "../modules/nodes.js";
import edgeModule from "../modules/edges.js";
import { response } from "../helpers/index.js";
import { STATUS_CODE } from "../constants/index.js";

const fetchAllProcess = async (req, res) => {
  try {
    const { userId, publish, status } = req.query;
    const condition = {};

    if (userId) condition.createByUser = userId;
    if (publish) condition.publish = publish;
    if (status) condition.status = status;

    const allProcess = await processMobule.find(condition);

    return res.status(STATUS_CODE.SUCCESS).json(response(allProcess, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const fetchProcessById = async (req, res) => {
  try {
    const process = await processMobule.findOne({ _id: req.params.id });

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
    const checkProcess = await processMobule.findOne({ name });

    if (checkProcess) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "process da ton tai!"));
    }

    if (!nodes?.length) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "workflow chua dc nhap!"));
    }

    const newNodes = nodes.map((node) => ({
      ...node,
      ...node.data,
    }));
    const nodeInMongoose = await nodeModule.create(newNodes);
    // const edgeInMongoose = await edgeModule.create(edges);

    const newProcess = {
      name: name,
      description: description || "",
      nodes: nodeInMongoose.map((node) => node.id),
      // edges: edgeInMongoose.map((edge) => edge.id),
      roles: listRole || [],
      project: project || [],
      createByUser: req.user,
      publish: publish || 1,
      status: 1,
    };

    const result = await processMobule.create(newProcess);

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "tao process thanh cong"));
  } catch (error) {
    console.log("error", error);
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const updateProcess = async (req, res) => {
  try {
    const { name } = req.body;
    const checkProcess = await processMobule.findOne({ name });

    if (checkProcess) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "ten process da ton tai!"));
    }

    const result = await processMobule.findByIdAndUpdate(
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
    const processById = processMobule.findOne({ _id: req.params.id });

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

    const result = await processMobule.create(newProcess);
    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "tao process thanh cong"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const deleteProcess = async (req, res) => {
  try {
    const processDeleted = await processMobule.deleteOne({
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
