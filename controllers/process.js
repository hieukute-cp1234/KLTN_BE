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

    const allProcess = await processMobule
      .find(condition)
      .populate("nodes")
      .populate("roles")
      .populate("edges")
      .populate("createByUser", ["email"]);

    return res.status(STATUS_CODE.SUCCESS).json(response(allProcess, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const fetchProcessById = async (req, res) => {
  try {
    const process = await processMobule
      .findOne({ _id: req.params.id })
      .populate("nodes")
      .populate("roles")
      .populate("edges");

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
    const { name, description, roles, project, nodes, edges } = req.body;
    const checkProcess = await processMobule.findOne({ name });

    if (checkProcess) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "Process already exist!"));
    }

    if (!nodes?.length) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "workflow chua dc nhap!"));
    }

    const newProcess = {
      name: name,
      description: description || "",
      nodes: nodes.map((node) => node.id),
      edges: edges.map((edge) => edge.id),
      roles: roles || [],
      project: project || [],
      createByUser: req.user,
      publish: req.role === 1 ? 1 : 0,
      isDisabled: false,
      status: 1,
    };

    const result = await processMobule.create(newProcess);

    const createNodes = nodes.map((node) => {
      const newNode = {
        ...node,
        ...node.data,
        _id: node.id,
        process: result.id,
      };
      delete newNode.id;
      return newNode;
    });

    const createEdges = edges.map((edge) => {
      const newEdge = { ...edge, _id: edge.id, process: result.id };
      delete newEdge.id;
      return newEdge;
    });

    await nodeModule.create(createNodes);
    await edgeModule.create(createEdges);

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "tao process thanh cong"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const updateProcess = async (req, res) => {
  try {
    const { id, nodes, edges } = req.body;
    const checkProcess = await processMobule.findOne({ _id: id });

    if (checkProcess) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "ten process da ton tai!"));
    }

    for (const node of nodes) {
      const newNode = { ...node, ...node.data };
      await nodeModule.updateOne({ id: node.id }, newNode, { upsert: true });
    }

    for (const edge of edges) {
      await nodeModule.updateOne({ id: edge.id }, edge, { upsert: true });
    }

    const result = await processMobule.findByIdAndUpdate(req.params.id, {
      ...req.body,
      nodes: nodes.map((node) => node.id),
      edges: edges.map((edge) => edge.id),
    });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "tao process thanh cong"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const publishProcess = async (req, res) => {
  try {
    const { publish } = req.body;

    const result = await processMobule.findByIdAndUpdate(req.params.id, {
      publish: publish,
    });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "tao process thanh cong"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const copyProcess = async (req, res) => {
  try {
    const processById = await processMobule.findOne({ _id: req.params.id });

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
      publish: 0,
      roles: processById.roles || [],
      createByUser: req.user,
      project: [],
      status: 1,
      isDisabled: false,
    };

    const result = await processMobule.create(newProcess);
    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "Copy process success!"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const deleteProcess = async (req, res) => {
  try {
    const processDeleted = await processMobule.deleteOne({
      _id: req.params.id,
    });

    await nodeModule.deleteMany({ process: req.params.id });

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
  publishProcess,
  copyProcess,
  deleteProcess,
  fetchAllProcess,
  fetchProcessById,
};
