import roleModule from "../modules/roles.js";
import { response } from "../helpers/index.js";
import { STATUS_CODE } from "../constants/index.js";

const fetchAllRole = async (_req, res) => {
  try {
    const result = await roleModule.find({});
    return res.status(STATUS_CODE.SUCCESS).json(response(result, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const createRole = async (req, res) => {
  try {
    const { name, description, level } = req.body;
    const role = await roleModule.findOne({ name });
    if (role) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "role da ton tai"));
    }

    const newRole = {
      name: name,
      description: description,
      level: level,
      type: 1,
    };

    const result = await roleModule.create(newRole);
    return res.status(STATUS_CODE.SUCCESS).json(response(result, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const updateRole = async (req, res) => {
  try {
    const { name } = req.body;

    const role = await roleModule.findOne({ name });

    if (role) {
      return res
        .status(STATUS_CODE.VALIDATE)
        .json(response(null, "role name da ton tai"));
    }

    const result = await roleModule.findByIdAndUpdate(req.params.id, req.body);

    return res.status(STATUS_CODE.SUCCESS).json(response(result, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const deleteRole = async (req, res) => {
  try {
    const result = await roleModule.deleteOne({ _id: req.params.id });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json(response(result, "delete thanh cong"));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

export default { fetchAllRole, createRole, updateRole, deleteRole };
