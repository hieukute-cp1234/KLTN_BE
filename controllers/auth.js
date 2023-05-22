import bcrypt from "bcrypt";
import users from "../modules/users.js";
import { generateToken } from "../helpers/jwt.js";
import { response } from "../helpers/index.js";

const register = async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    if (!email || !password) {
      return res.status(400).json(response(null, "email la bat buoc"));
    }

    const checkEmail = await users.findOne({ email });

    if (checkEmail) {
      return res.status(400).json(response(null, "email da duoc dang ki"));
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const handlePass = bcrypt.hashSync(password, salt);

    const newUser = {
      email: email,
      password: handlePass,
      userName: userName || "",
    };
    const result = await users.create(newUser);
    return res.status(200).json(response(result, "dang ki thanh cong"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(response(null, "email la bat buoc"));
    }

    const checkEmail = await users.findOne({ email });
    if (!checkEmail) {
      return res.status(400).json(response(null, "email chua duoc dang ki"));
    }

    const checkPassword = await checkEmail.comparePass(password);
    if (!checkPassword) {
      return res
        .status(400)
        .json(response(null, "password vua nhap khong dung"));
    }

    const token = await generateToken(checkEmail._id);
    return res.status(200).json(response(token, "dang nhap thanh cong"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default { register, login };
