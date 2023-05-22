import { DEFAULT_SOURCE } from "../constants/index.js";
import authRoute from "./auth.js";

export const routes = (app) => {
  app.use(DEFAULT_SOURCE, authRoute);
};
