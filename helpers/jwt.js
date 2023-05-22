import jwt from "jsonwebtoken";
import { TOKEN } from "../constants/index.js";

const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: payload },
      TOKEN.KEY,
      {
        algorithm: "HS256",
        expiresIn: TOKEN.TIME,
      },
      (error, token) => {
        if (error) {
          reject(error);
        }
        resolve(token);
      }
    );
  });
};

const verityToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, TOKEN.KEY, (error, decoded) => {
      if (error) {
        reject(error);
      }
      resolve(decoded);
    });
  });
};

export { generateToken, verityToken };
