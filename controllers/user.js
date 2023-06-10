import userModule from "../modules/users.js";
import { response } from "../helpers/index.js";
import { STATUS_CODE } from "../constants/index.js";

const fetchAllUser = async (req, res) => {
  try {
    const { isUser } = req.query;
    const conditions = {};
    if (isUser) conditions.role = { $ne: 1 };

    const result = await userModule.find(conditions, { password: 0 });

    return res.status(STATUS_CODE.SUCCESS).json(response(result, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const fetchMe = async (req, res) => {
  try {
    const result = await userModule.findOne({ _id: req.user }, { password: 0 });
    return res.status(STATUS_CODE.SUCCESS).json(response(result, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

const fetchUserById = async (req, res) => {
  try {
    const result = await userModule.findOne({ _id: req.params.id });
    return res.status(STATUS_CODE.SUCCESS).json(response(result, null));
  } catch (error) {
    return res.status(STATUS_CODE.SERVER).json(response(error));
  }
};

export default { fetchAllUser, fetchMe, fetchUserById };
