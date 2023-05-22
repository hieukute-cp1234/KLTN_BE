import { verityToken } from "../helpers/jwt.js";
import { response } from "../helpers/index.js";

export const verifyTken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(402).json(response(null, "Access token not found"));
    }

    const dataUser = await verityToken(token);
    req.user = dataUser._id;
    next();
  } catch (error) {
    return res.status(500).json(response(null, error.message));
  }
};
